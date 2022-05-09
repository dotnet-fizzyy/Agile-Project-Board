using WebAPI.Application.Repositories.User;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.User
{
	public class UserWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.User>, IUserWriteOnlyRepository
	{
		public UserWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
