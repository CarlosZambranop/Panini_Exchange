using System.ComponentModel.DataAnnotations;

namespace DataCollectionAPI.DTOs
{
    // ?? Auth DTOs ??????????????????????????????????????????????????????????

    public class RegisterRequest
    {
        [Required] [MaxLength(150)] public string FullName  { get; set; } = string.Empty;
        [Required] [EmailAddress]   public string Email     { get; set; } = string.Empty;
        [Required] [MaxLength(20)]  public string Phone     { get; set; } = string.Empty;
        [Required] [MaxLength(100)] public string City      { get; set; } = string.Empty;
        [Required] [MinLength(6)]   public string Password  { get; set; } = string.Empty;
        public string? FavoriteAlbum { get; set; }
        public bool PrivacyPolicyAccepted { get; set; }
    }

    public class LoginRequest
    {
        [Required] [EmailAddress] public string Email    { get; set; } = string.Empty;
        [Required]                public string Password { get; set; } = string.Empty;
    }

    public class AuthResponse
    {
        public int    Id          { get; set; }
        public string DisplayName { get; set; } = string.Empty;
        public string Email       { get; set; } = string.Empty;
        public string City        { get; set; } = string.Empty;
        public int    StickerCount { get; set; }
        public string? FavoriteAlbum { get; set; }
        /// <summary>Fake JWT token (Base64 placeholder — educational only).</summary>
        public string Token       { get; set; } = string.Empty;
    }

    // ?? User Profile ???????????????????????????????????????????????????????

    public class UserProfileDto
    {
        public int    Id           { get; set; }
        public string DisplayName  { get; set; } = string.Empty;
        public string City         { get; set; } = string.Empty;
        public int    StickerCount { get; set; }
        public string? FavoriteAlbum { get; set; }
        public DateTime CreatedAt  { get; set; }
        public List<StickerDto> OwnedStickers { get; set; } = new();
    }
}
