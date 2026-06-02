using DataCollectionAPI.Data;
using DataCollectionAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DataCollectionAPI.Repositories
{
    /// <summary>
    /// Concrete implementation of IUserDataRepository using Entity Framework Core.
    /// </summary>
    public class UserDataRepository : IUserDataRepository
    {
        private readonly AppDbContext _context;

        public UserDataRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <inheritdoc />
        public async Task<UserData> CreateAsync(UserData userData)
        {
            _context.UserData.Add(userData);
            await _context.SaveChangesAsync();
            return userData;
        }

        /// <inheritdoc />
        public async Task<IEnumerable<UserData>> GetAllAsync()
        {
            return await _context.UserData
                .Include(u => u.UserStickers)
                .OrderByDescending(u => u.StickerCount)
                .ToListAsync();
        }

        /// <inheritdoc />
        public async Task<UserData?> GetByIdAsync(int id)
        {
            return await _context.UserData
                .Include(u => u.UserStickers)
                    .ThenInclude(us => us.Sticker)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        /// <inheritdoc />
        public async Task<UserData?> GetByEmailAsync(string email)
        {
            return await _context.UserData
                .FirstOrDefaultAsync(u => u.Email == email.ToLowerInvariant());
        }
    }
}
