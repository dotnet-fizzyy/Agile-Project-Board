using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class StoryRepository : BaseCrudRepository<Story>, IStoryRepository
    {
        public StoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
