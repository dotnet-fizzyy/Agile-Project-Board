using System;
using System.Threading.Tasks;
using WebAPI.Application.Models.User;
using WebAPI.Domain.Helpers;

namespace WebAPI.Application.Services.User.Queries
{
	public interface IUserQueriesUseCase
	{
		Task<CollectionResult<UserResult>> GetUsersAsync(int limit, int offset);

		Task<UserResult> GetUserByIdAsync(Guid id);
	}
}
