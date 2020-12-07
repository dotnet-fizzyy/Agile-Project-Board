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
    public class EpicService : IEpicService
    {
        private readonly IEpicRepository _epicRepository;
        private readonly IMapper _mapper;

        public EpicService(IEpicRepository epicRepository, IMapper mapper)
        {
            _epicRepository = epicRepository;
            _mapper = mapper;
        }

        public async Task<CollectionResponse<Epic>> GetEpicsAsync()
        {
            var epicEntities = await _epicRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Epic>
            {
                Items = epicEntities.Select(_mapper.Map<Epic>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Epic> GetEpicAsync(Guid epicId)
        {
            var epicEntity = await _epicRepository.SearchForSingleItemAsync(x => x.EpicId == epicId);

            if (epicEntity == null)
            {
                return null;
            }

            var epicModel = _mapper.Map<Epic>(epicEntity);

            return epicModel;
        }

        public async Task<Epic> CreateEpicAsync(Epic epic)
        {
            var epicEntity = _mapper.Map<Models.Entities.Epic>(epic);

            var createdEntity = await _epicRepository.CreateItemAsync(epicEntity);

            var epicModel = _mapper.Map<Epic>(createdEntity);

            return epicModel;
        }

        public async Task<Epic> UpdateEpicAsync(Epic epic)
        {
            var epicEntity = _mapper.Map<Models.Entities.Epic>(epic);

            var updatedEntity = await _epicRepository.UpdateItemAsync(epicEntity);

            var epicModel = _mapper.Map<Epic>(updatedEntity);

            return epicModel;
        }

        public async Task RemoveEpicAsync(Guid epicId)
        {
            await _epicRepository.RemoveItemAsync(x => x.EpicId == epicId);
        }
    }
}
