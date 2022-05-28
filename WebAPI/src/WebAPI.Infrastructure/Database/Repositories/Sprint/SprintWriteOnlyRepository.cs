using WebAPI.Application.Repositories.Sprint;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Sprint
{
	public class SprintWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Sprint>, ISprintWriteOnlyRepository
	{
		public SprintWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
