using DataCollectionAPI.Models;

namespace DataCollectionAPI.DTOs
{
    /// <summary>Sticker card shown in the marketplace grid.</summary>
    public class StickerDto
    {
        public int     Id          { get; set; }
        public string  Name        { get; set; } = string.Empty;
        public string  Team        { get; set; } = string.Empty;
        public string  Category    { get; set; } = string.Empty;
        public string  Rarity      { get; set; } = string.Empty;
        public string  ImageUrl    { get; set; } = string.Empty;
        public string? Description { get; set; }
        /// <summary>How many users own this sticker — computed from UserSticker table.</summary>
        public int     OwnerCount  { get; set; }
    }

    /// <summary>Slim owner info returned by GET /api/stickers/{id}/owners.</summary>
    public class StickerOwnerDto
    {
        public int    UserId      { get; set; }
        public string DisplayName { get; set; } = string.Empty;
        public string City        { get; set; } = string.Empty;
        public string OwnedSince  { get; set; } = string.Empty;
    }
}
