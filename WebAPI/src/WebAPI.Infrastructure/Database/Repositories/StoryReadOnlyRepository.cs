using WebAPI.Application.Repositories;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public class StoryReadOnlyRepository : BaseReadOnlyRepository<Story>, IStoryReadOnlyRepository
	{
		public StoryReadOnlyRepository(DatabaseContext databaseContext) : base(databaseContext)
		{
		}
	}
}
