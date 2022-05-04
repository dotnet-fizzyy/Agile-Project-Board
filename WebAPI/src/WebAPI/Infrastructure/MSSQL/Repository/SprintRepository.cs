using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class SprintRepository : BaseCrudRepository<Sprint>, ISprintRepository
    {
        public SprintRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
