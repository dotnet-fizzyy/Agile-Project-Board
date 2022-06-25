using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class TeamReadOnlyRepository : BaseReadOnlyRepository<Team>, ITeamReadOnlyRepository
	{
		public TeamReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
