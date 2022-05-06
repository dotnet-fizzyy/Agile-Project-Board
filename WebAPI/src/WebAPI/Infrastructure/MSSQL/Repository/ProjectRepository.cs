using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class ProjectRepository : BaseCrudRepository<Project>, IProjectRepository
    {
        public ProjectRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task<ProjectMainPageData> GetProjectMainPageDataAsync(Guid userId)
        {
	        var query =
				from users in this.DatabaseContext.Users
				join teams in this.DatabaseContext.Teams on users.TeamId equals teams.TeamId
		        join projects in this.DatabaseContext.Projects on teams.ProjectId equals projects.ProjectId
		        where users.UserId == userId
				select new { teams, projects };

	        var result = (await query.ToListAsync()).FirstOrDefault();

	        var mainPageDataModel = new ProjectMainPageData
	        {
				Project = result?.projects ?? new Project(),
				Team = result?.teams ?? new Team(),
	        };

	        return mainPageDataModel;
        }
    }
}
