using WebAPI.Application.Repositories.Story;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class StoryWriteOnlyRepository : BaseWriteOnlyRepository<Domain.Entities.Story>, IStoryWriteOnlyRepository
	{
		public StoryWriteOnlyRepository(DatabaseContext database) : base(database)
		{

		}
	}
}
