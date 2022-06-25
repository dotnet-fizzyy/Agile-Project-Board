using WebAPI.Application.Repositories.Project;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class ProjectReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Project>, IProjectReadOnlyRepository
	{
		public ProjectReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
