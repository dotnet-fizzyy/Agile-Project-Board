using System.Threading.Tasks;
using WebAPI.Application.Repositories.Common;

namespace WebAPI.Application.Repositories.User
{
	public interface IUserReadOnlyRepository : IBaseReadOnlyRepository<Domain.Entities.User>
	{
		Task<Domain.Entities.User> AuthenticateUserAsync(string username, string password);
	}
}
