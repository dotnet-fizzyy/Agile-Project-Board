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
        private readonly IStoryRepository _storyRepository;
        private readonly IMapper _mapper;

        public StoryService(IStoryRepository storyRepository, IMapper mapper)
        {
            _storyRepository = storyRepository;
            _mapper = mapper;
        }

        public async Task<CollectionResponse<Story>> GeStoriesAsync()
        {
            var storyEntities = await _storyRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Story>
            {
                Items = storyEntities.Select(_mapper.Map<Story>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Story> GetStoryAsync(Guid storyId)
        {
            var storyEntity = await _storyRepository.SearchForSingleItemAsync(x => x.StoryId == storyId);

            var storyModel = _mapper.Map<Story>(storyEntity);

            return storyModel;
        }

        public async Task<Story> CreateStoryAsync(Story story)
        {
            var storyEntity = _mapper.Map<Models.Entities.Story>(story);

            var createdEntity = await _storyRepository.CreateItemAsync(storyEntity);

            var storyModel = _mapper.Map<Story>(createdEntity);

            return storyModel;
        }

        public async Task<Story> UpdateStoryAsync(Story story)
        {
            var storyEntity = _mapper.Map<Models.Entities.Story>(story);

            var updatedEntity = await _storyRepository.UpdateItemAsync(storyEntity);

            var storyModel = _mapper.Map<Story>(updatedEntity);

            return storyModel;
        }

        public async Task UpdateStoryColumnAsync(UpdateStoryColumnModel storyColumn)
        {
	        var column = (Columns)Enum.Parse(typeof(Columns), storyColumn.Column);

	        await _storyRepository.UpdateStoryColumnAsync(storyColumn.StoryId, column);
        }

        public async Task RemoveStoryAsync(Guid storyId)
        {
            await _storyRepository.RemoveItemAsync(x => x.StoryId == storyId);
        }
    }
}
