using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class EpicReadOnlyRepository : BaseReadOnlyRepository<Epic>, IEpicReadOnlyRepository
	{
		public EpicReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
