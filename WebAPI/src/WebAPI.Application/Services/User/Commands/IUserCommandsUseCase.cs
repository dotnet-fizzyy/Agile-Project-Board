using System.Threading.Tasks;
using WebAPI.Application.Models.User;

namespace WebAPI.Application.Services.User.Commands
{
	public interface IUserCommandsUseCase
	{
		Task<UserResult> CreateAsync();
	}
}
