using WebAPI.Application.Repositories.Epic;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class EpicReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Epic>, IEpicReadOnlyRepository
	{
		public EpicReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
