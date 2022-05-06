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
        private readonly IEpicRepository epicRepository;
        private readonly IMapper mapper;

        public EpicService(IEpicRepository epicRepository, IMapper mapper)
        {
            this.epicRepository = epicRepository;
            this.mapper = mapper;
        }

        public async Task<CollectionResponse<Epic>> GetEpicsAsync()
        {
            var epicEntities = await this.epicRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Epic>
            {
                Items = epicEntities.Select(this.mapper.Map<Epic>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Epic> GetEpicAsync(Guid epicId)
        {
            var epicEntity = await this.epicRepository.SearchForSingleItemAsync(x => x.EpicId == epicId);

            if (epicEntity == null)
            {
                return null;
            }

            var epicModel = this.mapper.Map<Epic>(epicEntity);

            return epicModel;
        }

        public async Task<Epic> CreateEpicAsync(Epic epic)
        {
            var epicEntity = this.mapper.Map<Models.Entities.Epic>(epic);

            var createdEntity = await this.epicRepository.CreateItemAsync(epicEntity);

            var epicModel = this.mapper.Map<Epic>(createdEntity);

            return epicModel;
        }

        public async Task<Epic> UpdateEpicAsync(Epic epic)
        {
            var epicEntity = this.mapper.Map<Models.Entities.Epic>(epic);

            var updatedEntity = await this.epicRepository.UpdateItemAsync(epicEntity);

            var epicModel = this.mapper.Map<Epic>(updatedEntity);

            return epicModel;
        }

		public async Task RemoveEpicAsync(Guid epicId) => await this.epicRepository.RemoveItemAsync(x => x.EpicId == epicId);
	}
}
