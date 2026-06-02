using DataCollectionAPI.Models;

namespace DataCollectionAPI.Repositories
{
    /// <summary>
    /// Repository interface defining data access operations for UserData.
    /// </summary>
    public interface IUserDataRepository
    {
        Task<UserData> CreateAsync(UserData userData);
        Task<IEnumerable<UserData>> GetAllAsync();
        Task<UserData?> GetByIdAsync(int id);
        Task<UserData?> GetByEmailAsync(string email);
    }
}
