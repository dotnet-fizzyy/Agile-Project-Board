using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class SprintReadOnlyRepository : BaseReadOnlyRepository<Sprint>, ISprintReadOnlyRepository
	{
		public SprintReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
