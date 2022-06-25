using WebAPI.Application.Repositories.Sprint;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class SprintWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Sprint>, ISprintWriteOnlyRepository
	{
		public SprintWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
