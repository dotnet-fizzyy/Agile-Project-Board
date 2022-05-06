using System;
using System.Threading.Tasks;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Models.Entities;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public class StoryRepository : BaseCrudRepository<Story>, IStoryRepository
    {
        public StoryRepository(DatabaseContext databaseContext) : base(databaseContext)
        {
        }

        public async Task UpdateStoryColumnAsync(Guid storyId, Columns column)
        {
	        var story = new Story { StoryId = storyId, Columns = column };

            this.DatabaseContext.Stories.Attach(story);
            this.DatabaseContext.Entry(story).Property(x => x.Columns).IsModified = true;

	        await this.DatabaseContext.SaveChangesAsync();
        }
    }
}
