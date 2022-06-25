using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class SprintWriteOnlyRepository : BaseWriteOnlyRepository<Sprint>, ISprintWriteOnlyRepository
	{
		public SprintWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
