using WebAPI.Application.Repositories.Story;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Story
{
	public class StoryReadOnlyRepository : BaseReadOnlyRepository<Domain.Entities.Story>, IStoryReadOnlyRepository
	{
		public StoryReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{
		}
	}
}
