using WebAPI.Application.Repositories.Epic;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Epic
{
	public class EpicReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Epic>, IEpicReadOnlyRepository
	{
		public EpicReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
