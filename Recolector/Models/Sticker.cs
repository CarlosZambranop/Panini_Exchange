using System.ComponentModel.DataAnnotations;

namespace DataCollectionAPI.Models
{
    public enum Rarity { Common, Rare, Epic, Legend }

    /// <summary>A Panini-style collectible sticker card. All data is seeded/fake.</summary>
    public class Sticker
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Team { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        public Rarity Rarity { get; set; } = Rarity.Common;

        /// <summary>URL to placeholder image (from picsum.photos or similar).</summary>
        [MaxLength(500)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(300)]
        public string? Description { get; set; }

        // Navigation
        public ICollection<UserSticker> UserStickers { get; set; } = new List<UserSticker>();
    }
}
