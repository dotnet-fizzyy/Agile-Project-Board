using System;
using WebAPI.Application.Repositories.User;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.User
{
	public class UserWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.User>, IUserWriteOnlyRepository
	{
		public UserWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}

		public void UpdatePassword(Guid userId, string password)
		{
			var user = new Domain.Entities.User
			{
				Id = userId,
				Password = password,
			};

			this.DatabaseContext.Users.Attach(user);
			this.DatabaseContext.Entry(user).Property(x => x.Password).IsModified = true;
		}

		public void UpdateActivityStatus(Guid userId, bool isActive)
		{
			var user = new Domain.Entities.User
			{
				Id = userId,
				IsActive = isActive
			};

			this.DatabaseContext.Users.Attach(user);
			this.DatabaseContext.Entry(user).Property(x => x.IsActive).IsModified = true;
		}
	}
}
