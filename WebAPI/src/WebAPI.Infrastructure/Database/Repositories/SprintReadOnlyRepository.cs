using WebAPI.Application.Repositories.Sprint;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class SprintReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Sprint>, ISprintReadOnlyRepository
	{
		public SprintReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
