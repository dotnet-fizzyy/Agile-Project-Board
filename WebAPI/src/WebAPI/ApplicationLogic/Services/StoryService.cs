using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Core.Enums;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.ApplicationLogic.Services
{
    public class StoryService : IStoryService
    {
        private readonly IStoryRepository storyRepository;
        private readonly IMapper mapper;

        public StoryService(IStoryRepository storyRepository, IMapper mapper)
        {
            this.storyRepository = storyRepository;
            this.mapper = mapper;
        }

        public async Task<CollectionResponse<Story>> GeStoriesAsync()
        {
            var storyEntities = await this.storyRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(this.mapper.Map<Story>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Story> GetStoryAsync(Guid storyId)
        {
            var storyEntity = await this.storyRepository.SearchForSingleItemAsync(x => x.StoryId == storyId);

            var storyModel = this.mapper.Map<Story>(storyEntity);

            return storyModel;
        }

        public async Task<Story> CreateStoryAsync(Story story)
        {
            var storyEntity = this.mapper.Map<Models.Entities.Story>(story);

            var createdEntity = await this.storyRepository.CreateItemAsync(storyEntity);

            var storyModel = this.mapper.Map<Story>(createdEntity);

            return storyModel;
        }

        public async Task<Story> UpdateStoryAsync(Story story)
        {
            var storyEntity = this.mapper.Map<Models.Entities.Story>(story);

            var updatedEntity = await this.storyRepository.UpdateItemAsync(storyEntity);

            var storyModel = this.mapper.Map<Story>(updatedEntity);

            return storyModel;
        }

        public async Task UpdateStoryColumnAsync(UpdateStoryColumnModel storyColumn)
        {
	        var column = (Columns)Enum.Parse(typeof(Columns), storyColumn.Column);

	        await this.storyRepository.UpdateStoryColumnAsync(storyColumn.StoryId, column);
        }

		public async Task RemoveStoryAsync(Guid storyId) => 
            await this.storyRepository.RemoveItemAsync(x => x.StoryId == storyId);
	}
}
