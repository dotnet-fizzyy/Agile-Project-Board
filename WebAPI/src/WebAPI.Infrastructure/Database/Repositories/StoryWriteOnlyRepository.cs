using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class StoryWriteOnlyRepository : BaseWriteOnlyRepository<Story>, IStoryWriteOnlyRepository
	{
		public StoryWriteOnlyRepository(DatabaseContext database) : base(database)
		{

		}
	}
}
