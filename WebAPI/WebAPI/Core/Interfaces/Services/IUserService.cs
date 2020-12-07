using System;
using System.Threading.Tasks;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IUserService
    {
        Task<CollectionResponse<User>> GetUsersAsync();

        Task<User> GetUserAsync(Guid userId);

        Task<User> CreateUserAsync(User user);

        Task<User> UpdateUserAsync(User user);

        Task RemoveUserAsync(Guid userId);
    }
}
