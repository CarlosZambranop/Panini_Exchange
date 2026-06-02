using DataCollectionAPI.Models;

namespace DataCollectionAPI.Repositories
{
    public interface IStickerRepository
    {
        Task<IEnumerable<Sticker>> GetAllAsync();
        Task<Sticker?>             GetByIdAsync(int id);
        Task<IEnumerable<UserSticker>> GetOwnersByStickerId(int stickerId);
    }
}
