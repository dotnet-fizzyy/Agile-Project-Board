using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class EpicWriteOnlyRepository : BaseWriteOnlyRepository<Epic>, IEpicWriteOnlyRepository
	{
		public EpicWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
