using WebAPI.Application.Repositories.Team;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Team
{
	public class TeamReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Team>, ITeamReadOnlyRepository
	{
		public TeamReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
