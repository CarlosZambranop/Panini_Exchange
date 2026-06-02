using System.ComponentModel.DataAnnotations;

namespace DataCollectionAPI.Models
{
    /// <summary>Collector user — all data is fake/seeded for educational purposes.</summary>
    public class UserData
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(150)]
        public string FullName { get; set; } = string.Empty;

        [Required, MaxLength(200), EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required, MaxLength(20)]
        public string Phone { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string City { get; set; } = string.Empty;

        /// <summary>Number of fake stickers the collector owns.</summary>
        [Required]
        public int StickerCount { get; set; }

        [MaxLength(150)]
        public string? FavoriteAlbum { get; set; }

        /// <summary>Hashed password — BCrypt (fake/simplified for educational use).</summary>
        [Required, MaxLength(256)]
        public string PasswordHash { get; set; } = string.Empty;

        public bool PrivacyPolicyAccepted { get; set; }
        
        /// <summary>UTC timestamp of privacy policy acceptance.</summary>
        public DateTime AcceptanceDate { get; set; } = DateTime.UtcNow;

        /// <summary>IP address of the client at submission time.</summary>
        [MaxLength(45)]
        public string? IpAddress { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public ICollection<UserSticker> UserStickers { get; set; } = new List<UserSticker>();
    }
}
