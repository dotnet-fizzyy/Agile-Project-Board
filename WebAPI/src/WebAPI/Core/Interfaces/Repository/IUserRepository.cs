using System;
using System.Threading.Tasks;
using WebAPI.Models.Entities;

namespace WebAPI.Core.Interfaces.Repository
{
	public interface IUserRepository : IBaseCrudRepository<User>
	{
		Task<User> AuthenticateUserAsync(User user);

		Task<User> UpdateUserWithoutPasswordAsync(User user);

		Task UpdateUserPasswordAsync(Guid userId, string password);

		Task UpdateUserStatusAsync(Guid userId, bool isActive);

		Task UpdateUserTeamAsync(Guid userId, Guid teamId);
	}
}
