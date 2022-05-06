using System;
using System.Data.Entity;
using System.Threading.Tasks;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class UserRepository : BaseCrudRepository<User>, IUserRepository
    {
        public UserRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task<User> AuthenticateUserAsync(User user)
        {
	        var foundUser = await this.DatabaseContext.Users.FirstOrDefaultAsync(x => x.Username == user.Username && x.Password == user.Password && x.IsActive);

	        return foundUser;
        }

        public async Task<User> UpdateUserWithoutPasswordAsync(User user)
        {
            this.DatabaseContext.Users.Attach(user);
            this.DatabaseContext.Entry(user).Property(x => x.Password).IsModified = false;

	        await this.DatabaseContext.SaveChangesAsync();

	        return user;
        }

        public async Task UpdateUserPasswordAsync(Guid userId, string password)
        {
	        var userUpdateEntity = new User { UserId = userId, Password = password };

            this.DatabaseContext.Users.Attach(userUpdateEntity);
            this.DatabaseContext.Entry(userUpdateEntity).Property(x => x.Password).IsModified = true;

	        await this.DatabaseContext.SaveChangesAsync();
        }

        public async Task UpdateUserStatusAsync(Guid userId, bool isActive)
        {
	        var userUpdateEntity = new User { UserId = userId, IsActive = isActive };

            this.DatabaseContext.Users.Attach(userUpdateEntity);
            this.DatabaseContext.Entry(userUpdateEntity).Property(x => x.IsActive).IsModified = true;

	        await this.DatabaseContext.SaveChangesAsync();
        }

        public async Task UpdateUserTeamAsync(Guid userId, Guid teamId)
        {
	        var userUpdateEntity = new User { UserId = userId, TeamId = teamId };

            this.DatabaseContext.Users.Attach(userUpdateEntity);
            this.DatabaseContext.Entry(userUpdateEntity).Property(x => x.TeamId).IsModified = true;

            await this.DatabaseContext.SaveChangesAsync();
        }
    }
}
