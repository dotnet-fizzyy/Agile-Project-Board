using System.Threading.Tasks;
using WebAPI.Domain.Entities;

namespace WebAPI.Application.Repositories
{
	public interface IUserReadOnlyRepository : IBaseReadOnlyRepository<User>
	{
		Task<User> AuthenticateUserAsync(string username, string password);
	}
}
