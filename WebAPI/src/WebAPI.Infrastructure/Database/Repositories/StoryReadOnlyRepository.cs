using WebAPI.Application.Repositories.Story;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class StoryReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Story>, IStoryReadOnlyRepository
	{
		public StoryReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{
		}
	}
}
