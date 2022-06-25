using WebAPI.Application.Repositories.Team;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class TeamReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Team>, ITeamReadOnlyRepository
	{
		public TeamReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
