using WebAPI.Application.Repositories.Epic;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class EpicWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Epic>, IEpicWriteOnlyRepository
	{
		public EpicWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
