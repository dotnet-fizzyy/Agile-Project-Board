using System;
using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class UserWriteOnlyRepository : BaseWriteOnlyRepository<User>, IUserWriteOnlyRepository
	{
		public UserWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}

		public void UpdatePassword(Guid userId, string password)
		{
			var user = new User
			{
				Id = userId,
				Password = password,
			};

			this.DatabaseContext.Users.Attach(user);
			this.DatabaseContext.Entry(user).Property(x => x.Password).IsModified = true;
		}

		public void UpdateActivityStatus(Guid userId, bool isActive)
		{
			var user = new User
			{
				Id = userId,
				IsActive = isActive
			};

			this.DatabaseContext.Users.Attach(user);
			this.DatabaseContext.Entry(user).Property(x => x.IsActive).IsModified = true;
		}
	}
}
