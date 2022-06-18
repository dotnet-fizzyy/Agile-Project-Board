using System;
using System.Data.Entity;
using System.Threading.Tasks;
using WebAPI.Application.Repositories.User;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.User
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
				throw new Exception("Not found");
			}

			return existingUser;
		}
	}
}
