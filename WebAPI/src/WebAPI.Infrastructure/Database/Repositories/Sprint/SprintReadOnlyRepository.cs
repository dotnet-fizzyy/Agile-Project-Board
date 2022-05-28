using WebAPI.Application.Repositories.Sprint;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Sprint
{
	public class SprintReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Sprint>, ISprintReadOnlyRepository
	{
		public SprintReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
