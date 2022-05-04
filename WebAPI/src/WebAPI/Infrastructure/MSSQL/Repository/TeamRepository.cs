using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class TeamRepository : BaseCrudRepository<Team>, ITeamRepository
    {
        public TeamRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
