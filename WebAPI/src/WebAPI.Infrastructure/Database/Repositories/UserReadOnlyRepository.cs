using System.Data.Entity;
using System.Threading.Tasks;
using WebAPI.Application.Repositories.User;
using WebAPI.DomainAPI.Exceptions;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class UserReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.User>, IUserReadOnlyRepository
	{
		public UserReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}

		public async Task<Domain.Entities.User> AuthenticateUserAsync(string username, string password)
		{
			var existingUser = await this.DatabaseContext.Users.FirstOrDefaultAsync(user =>
				user.Username == username &&
				user.Password == password &&
				user.IsActive
			);

			if (existingUser == null)
			{
				throw new NotFoundException(
					nameof(Domain.Entities.User), 
					$"{nameof(existingUser.Username)} and {nameof(existingUser.Password)}"
				);
			}

			return existingUser;
		}
	}
}
