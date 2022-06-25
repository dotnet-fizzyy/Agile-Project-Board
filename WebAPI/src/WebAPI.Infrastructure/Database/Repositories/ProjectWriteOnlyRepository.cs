using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class ProjectWriteOnlyRepository : BaseWriteOnlyRepository<Project>, IProjectWriteOnlyRepository
	{
		public ProjectWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
