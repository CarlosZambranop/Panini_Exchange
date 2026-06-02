using DataCollectionAPI.DTOs;
using DataCollectionAPI.Models;
using DataCollectionAPI.Repositories;

namespace DataCollectionAPI.Services
{
    /// <summary>
    /// Handles business logic for user data submission and retrieval.
    /// </summary>
    public class UserDataService : IUserDataService
    {
        private readonly IUserDataRepository _repository;
        private readonly ILogger<UserDataService> _logger;

        public UserDataService(IUserDataRepository repository, ILogger<UserDataService> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        /// <inheritdoc />
        public async Task<UserDataResponseDto> SubmitUserDataAsync(UserDataRequestDto dto, string? ipAddress)
        {
            if (!dto.PrivacyPolicyAccepted)
                throw new InvalidOperationException("El usuario debe aceptar la política de privacidad (Ley 1581 de 2012).");

            var entity = new UserData
            {
                FullName = dto.FullName.Trim(),
                Email = dto.Email.Trim().ToLowerInvariant(),
                Phone = dto.Phone.Trim(),
                City = dto.City.Trim(),
                StickerCount = dto.StickerCount,
                FavoriteAlbum = dto.FavoriteAlbum?.Trim(),
                PrivacyPolicyAccepted = dto.PrivacyPolicyAccepted,
                AcceptanceDate = DateTime.UtcNow,
                IpAddress = ipAddress,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _repository.CreateAsync(entity);
            _logger.LogInformation("Collector registered. Id={Id}, City={City}, Stickers={Count}",
                created.Id, created.City, created.StickerCount);

            return MapToResponseDto(created);
        }

        /// <inheritdoc />
        public async Task<IEnumerable<UserDataResponseDto>> GetAllAsync()
        {
            var all = await _repository.GetAllAsync();
            return all.Select(MapToResponseDto);
        }

        // ?? Private helpers ????????????????????????????????????????????????
        private static UserDataResponseDto MapToResponseDto(UserData entity) => new()
        {
            Id = entity.Id,
            DisplayName = BuildDisplayName(entity.FullName),
            City = entity.City,
            StickerCount = entity.StickerCount,
            FavoriteAlbum = entity.FavoriteAlbum,
            PrivacyPolicyAccepted = entity.PrivacyPolicyAccepted,
            CreatedAt = entity.CreatedAt
        };

        /// <summary>
        /// Returns "FirstName L." to protect the user's full identity in the public listing.
        /// Example: "Carlos Lopez" -> "Carlos L."
        /// </summary>
        private static string BuildDisplayName(string fullName)
        {
            var parts = fullName.Trim().Split(' ', StringSplitOptions.RemoveEmptyEntries);
            if (parts.Length == 0) return fullName;
            var firstName = parts[0];
            var lastInitial = parts.Length > 1 ? $" {parts[^1][0]}." : string.Empty;
            return $"{firstName}{lastInitial}";
        }
    }
}
