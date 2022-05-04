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
	        var foundUser = await _databaseContext.Users.FirstOrDefaultAsync(x => x.Username == user.Username && x.Password == user.Password && x.IsActive);

	        return foundUser;
        }

        public async Task<User> UpdateUserWithoutPasswordAsync(User user)
        {
	        _databaseContext.Users.Attach(user);
	        _databaseContext.Entry(user).Property(x => x.Password).IsModified = false;

	        await _databaseContext.SaveChangesAsync();

	        return user;
        }

        public async Task UpdateUserPasswordAsync(Guid userId, string password)
        {
	        var userUpdateEntity = new User { UserId = userId, Password = password };

            _databaseContext.Users.Attach(userUpdateEntity);
	        _databaseContext.Entry(userUpdateEntity).Property(x => x.Password).IsModified = true;

	        await _databaseContext.SaveChangesAsync();
        }

        public async Task UpdateUserStatusAsync(Guid userId, bool isActive)
        {
	        var userUpdateEntity = new User { UserId = userId, IsActive = isActive };

	        _databaseContext.Users.Attach(userUpdateEntity);
	        _databaseContext.Entry(userUpdateEntity).Property(x => x.IsActive).IsModified = true;

	        await _databaseContext.SaveChangesAsync();
        }

        public async Task UpdateUserTeamAsync(Guid userId, Guid teamId)
        {
	        var userUpdateEntity = new User { UserId = userId, TeamId = teamId };

	        _databaseContext.Users.Attach(userUpdateEntity);
	        _databaseContext.Entry(userUpdateEntity).Property(x => x.TeamId).IsModified = true;

            await _databaseContext.SaveChangesAsync();
        }
    }
}
