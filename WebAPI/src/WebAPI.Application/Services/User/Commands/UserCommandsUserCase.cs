using WebAPI.Application.Repositories.User;

namespace WebAPI.Application.Services.User.Commands
{
	public class UserCommandsUserCase : IUserCommandsUseCase
	{
		private readonly IUserWriteOnlyRepository userWriteOnlyRepository;

		public UserCommandsUserCase(IUserWriteOnlyRepository userWriteOnlyRepository)
		{
			this.userWriteOnlyRepository = userWriteOnlyRepository;
		}
	}
}
