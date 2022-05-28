using WebAPI.Application.Repositories.Epic;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Epic
{
	public class EpicWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Epic>, IEpicWriteOnlyRepository
	{
		public EpicWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
