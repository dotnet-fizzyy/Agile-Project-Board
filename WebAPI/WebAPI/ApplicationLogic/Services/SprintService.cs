using System;
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
        private readonly ISprintRepository _sprintRepository;
        private readonly IMapper _mapper;

        public SprintService(ISprintRepository sprintRepository, IMapper mapper)
        {
            _sprintRepository = sprintRepository;
            _mapper = mapper;
        }

        public async Task<CollectionResponse<Sprint>> GetSprintsAsync()
        {
            var sprintEntities = await _sprintRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Sprint>
            {
                Items = sprintEntities.Select(_mapper.Map<Sprint>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<CollectionResponse<Sprint>> GetSprintsFromEpicAsync(Guid epicId)
        {
	        var sprintEntities = await _sprintRepository.SearchForMultipleItemsAsync(x => x.EpicId == epicId);

	        var collectionResponse = new CollectionResponse<Sprint>
	        {
		        Items = sprintEntities.Select(_mapper.Map<Sprint>).ToList(),
	        };

	        return collectionResponse;
        }

        public async Task<Sprint> GetSprintAsync(Guid sprintId)
        {
            var sprintEntity = await _sprintRepository.SearchForSingleItemAsync(x => x.SprintId == sprintId);

            var sprintModel = _mapper.Map<Sprint>(sprintEntity);

            return sprintModel;
        }

        public async Task<Sprint> CreateSprintAsync(Sprint sprint)
        {
            var sprintEntity = _mapper.Map<Models.Entities.Sprint>(sprint);

            var createdEntity = await _sprintRepository.CreateItemAsync(sprintEntity);

            var storyModel = _mapper.Map<Sprint>(createdEntity);

            return storyModel;
        }

        public async Task<Sprint> UpdateSprintAsync(Sprint sprint)
        {
            var sprintEntity = _mapper.Map<Models.Entities.Sprint>(sprint);

            var updatedEntity = await _sprintRepository.UpdateItemAsync(sprintEntity);

            var storyModel = _mapper.Map<Sprint>(updatedEntity);

            return storyModel;
        }

        public async Task RemoveSprintAsync(Guid sprintId)
        {
            await _sprintRepository.RemoveItemAsync(x => x.SprintId == sprintId);
        }
    }
}
