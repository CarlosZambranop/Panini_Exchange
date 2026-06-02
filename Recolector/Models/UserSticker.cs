namespace DataCollectionAPI.Models
{
    /// <summary>Many-to-many join between User and Sticker.</summary>
    public class UserSticker
    {
        public int UserId { get; set; }
        public UserData User { get; set; } = null!;

        public int StickerId { get; set; }
        public Sticker Sticker { get; set; } = null!;

        public DateTime OwnedSince { get; set; } = DateTime.UtcNow;
    }
}
