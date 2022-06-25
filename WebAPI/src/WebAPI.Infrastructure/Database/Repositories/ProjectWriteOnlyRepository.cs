using WebAPI.Application.Repositories.Project;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class ProjectWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Project>, IProjectWriteOnlyRepository
	{
		public ProjectWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
