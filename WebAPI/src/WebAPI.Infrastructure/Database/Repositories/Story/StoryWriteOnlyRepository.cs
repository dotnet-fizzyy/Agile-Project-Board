using WebAPI.Application.Repositories.Story;
using WebAPI.Infrastructure.Database.Repositories.Common;

namespace WebAPI.Infrastructure.Database.Repositories.Story
{
	public class StoryWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Story>, IStoryWriteOnlyRepository
	{
		public StoryWriteOnlyRepository(DatabaseContext database) : base(database)
		{

		}
	}
}
