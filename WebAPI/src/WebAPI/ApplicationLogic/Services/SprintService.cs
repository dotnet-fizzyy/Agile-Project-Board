using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.ApplicationLogic.Services
{
    public class SprintService : ISprintService
    {
        private readonly ISprintRepository sprintRepository;
        private readonly IMapper mapper;

        public SprintService(ISprintRepository sprintRepository, IMapper mapper)
        {
            this.sprintRepository = sprintRepository;
            this.mapper = mapper;
        }

        public async Task<CollectionResponse<Sprint>> GetSprintsAsync()
        {
            var sprintEntities = await this.sprintRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Sprint>
            {
                Items = sprintEntities.Select(this.mapper.Map<Sprint>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Sprint>> GetSprintsFromEpicAsync(Guid epicId, bool includeChildren)
        {
            IEnumerable<Models.Entities.Sprint> sprintEntities;
            if (includeChildren)
            {
                sprintEntities = await this.sprintRepository.SearchForMultipleItemsAsync(
                        x => x.EpicId == epicId, 
                        x => x.Stories
                    );
            }
            else
            {
                sprintEntities = await this.sprintRepository.SearchForMultipleItemsAsync(x => x.EpicId == epicId);
            }

            var collectionResponse = new CollectionResponse<Sprint>
	        {
		        Items = sprintEntities.Select(this.mapper.Map<Sprint>).ToList(),
	        };

	        return collectionResponse;
        }

        public async Task<Sprint> GetSprintAsync(Guid sprintId)
        {
            var sprintEntity = await this.sprintRepository.SearchForSingleItemAsync(x => x.SprintId == sprintId);

            var sprintModel = this.mapper.Map<Sprint>(sprintEntity);

            return sprintModel;
        }

        public async Task<Sprint> CreateSprintAsync(Sprint sprint)
        {
            var sprintEntity = this.mapper.Map<Models.Entities.Sprint>(sprint);

            var createdEntity = await this.sprintRepository.CreateItemAsync(sprintEntity);

            var storyModel = this.mapper.Map<Sprint>(createdEntity);

            return storyModel;
        }

        public async Task<Sprint> UpdateSprintAsync(Sprint sprint)
        {
            var sprintEntity = this.mapper.Map<Models.Entities.Sprint>(sprint);

            var updatedEntity = await this.sprintRepository.UpdateItemAsync(sprintEntity);

            var storyModel = this.mapper.Map<Sprint>(updatedEntity);

            return storyModel;
        }

		public async Task RemoveSprintAsync(Guid sprintId) => 
            await this.sprintRepository.RemoveItemAsync(x => x.SprintId == sprintId);
	}
}
