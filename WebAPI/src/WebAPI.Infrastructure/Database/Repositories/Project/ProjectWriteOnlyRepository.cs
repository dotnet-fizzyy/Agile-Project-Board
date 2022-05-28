using WebAPI.Application.Repositories.Project;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Project
{
	public class ProjectWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Project>, IProjectWriteOnlyRepository
	{
		public ProjectWriteOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{

		}
	}
}
