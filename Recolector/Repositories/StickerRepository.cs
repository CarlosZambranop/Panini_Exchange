using DataCollectionAPI.Data;
using DataCollectionAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DataCollectionAPI.Repositories
{
    public class StickerRepository : IStickerRepository
    {
        private readonly AppDbContext _context;
        public StickerRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Sticker>> GetAllAsync()
        {
            return await _context.Stickers
                .Include(s => s.UserStickers)
                .OrderBy(s => s.Id)
                .ToListAsync();
        }

        public async Task<Sticker?> GetByIdAsync(int id)
        {
            return await _context.Stickers
                .Include(s => s.UserStickers)
                    .ThenInclude(us => us.User)
                .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<UserSticker>> GetOwnersByStickerId(int stickerId)
        {
            return await _context.UserStickers
                .Include(us => us.User)
                .Where(us => us.StickerId == stickerId)
                .ToListAsync();
        }
    }
}
