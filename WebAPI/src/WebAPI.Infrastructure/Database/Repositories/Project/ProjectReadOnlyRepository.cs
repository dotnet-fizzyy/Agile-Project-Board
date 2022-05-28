using WebAPI.Application.Repositories.Project;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Project
{
	public class ProjectReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Project>, IProjectReadOnlyRepository
	{
		public ProjectReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
