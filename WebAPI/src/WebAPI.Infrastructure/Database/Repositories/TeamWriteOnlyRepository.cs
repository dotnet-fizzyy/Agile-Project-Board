using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class TeamWriteOnlyRepository : BaseWriteOnlyRepository<Team>, ITeamWriteOnlyRepository
	{
		public TeamWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
