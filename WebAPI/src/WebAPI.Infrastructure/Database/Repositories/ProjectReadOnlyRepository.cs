using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class ProjectReadOnlyRepository : BaseReadOnlyRepository<Project>, IProjectReadOnlyRepository
	{
		public ProjectReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
