using WebAPI.Application.Repositories.Team;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class TeamWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Team>, ITeamWriteOnlyRepository
	{
		public TeamWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
