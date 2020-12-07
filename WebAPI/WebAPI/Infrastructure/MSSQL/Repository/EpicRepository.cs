using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class EpicRepository : BaseCrudRepository<Epic>, IEpicRepository
    {
        public EpicRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
