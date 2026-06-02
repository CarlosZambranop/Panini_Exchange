using DataCollectionAPI.DTOs;

namespace DataCollectionAPI.Services
{
    /// <summary>
    /// Service interface for user data business logic.
    /// </summary>
    public interface IUserDataService
    {
        Task<UserDataResponseDto> SubmitUserDataAsync(UserDataRequestDto dto, string? ipAddress);
        Task<IEnumerable<UserDataResponseDto>> GetAllAsync();
    }
}
