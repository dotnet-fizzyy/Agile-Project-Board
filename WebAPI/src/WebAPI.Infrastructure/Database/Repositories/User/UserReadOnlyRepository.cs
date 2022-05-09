using WebAPI.Application.Repositories.User;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.User
{
	public class UserReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.User>, IUserReadOnlyRepository
	{
		public UserReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
