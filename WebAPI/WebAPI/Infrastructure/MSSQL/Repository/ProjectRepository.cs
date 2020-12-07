using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class ProjectRepository : BaseCrudRepository<Project>, IProjectRepository
    {
        public ProjectRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }
    }
}
