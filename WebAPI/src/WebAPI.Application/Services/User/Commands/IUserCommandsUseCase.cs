using System;
using System.Threading.Tasks;
using WebAPI.Application.Models.User;

namespace WebAPI.Application.Services.User.Commands
{
	public interface IUserCommandsUseCase
	{
		Task<UserResult> CreateCustomerAsync(UserAction user);

		Task<UserResult> CreateUserAsync(UserAction user);

		Task<UserResult> UpdateAsync(UserAction user);

		Task UpdatePasswordAsync(UserPasswordAction userPassword);

		Task UpdateActivityStatusAsync(UserActivityStatusAction userActivityStatus);

		Task RemoveByIdAsync(Guid id);
	}
}
