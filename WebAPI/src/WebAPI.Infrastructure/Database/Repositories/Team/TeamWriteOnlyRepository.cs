using WebAPI.Application.Repositories.Team;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Team
{
	public class TeamWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Team>, ITeamWriteOnlyRepository
	{
		public TeamWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
