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
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepository;
        private readonly IEpicRepository _epicRepository;
        private readonly IMapper _mapper;

        public ProjectService(IProjectRepository projectRepository, IEpicRepository epicRepository, IMapper mapper)
        {
            _projectRepository = projectRepository;
            _epicRepository = epicRepository;
            _mapper = mapper;
        }

        public async Task<CollectionResponse<Project>> GetProjectsAsync()
        {
            var projectEntities = await _projectRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Project>
            {
                Items = projectEntities.Select(_mapper.Map<Project>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Project> GeProjectAsync(Guid projectId)
        {
            var projectEntity = await _projectRepository.SearchForSingleItemAsync(x => x.ProjectId == projectId);

            var projectModel = _mapper.Map<Project>(projectEntity);

            return projectModel;
        }

        public async Task<FullProjectDescription> GetCustomerProject(Guid userId)
        {
	        var projectEntity = await _projectRepository.SearchForSingleItemAsync(x => x.CustomerId == userId);
	        if (projectEntity == null)
	        {
		        return null;
	        }

	        var epics = await _epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectEntity.ProjectId);

	        var fullProjectDescription = new FullProjectDescription
	        {
		        Project = _mapper.Map<Project>(projectEntity),
                Epics = epics.Select(_mapper.Map<Epic>)
	        };

	        return fullProjectDescription;
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            var projectEntity = _mapper.Map<Models.Entities.Project>(project);

            var createdEntity = await _projectRepository.CreateItemAsync(projectEntity);

            var projectModel = _mapper.Map<Project>(createdEntity);

            return projectModel;
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            var projectEntity = _mapper.Map<Models.Entities.Project>(project);

            var createdEntity = await _projectRepository.CreateItemAsync(projectEntity);

            var projectModel = _mapper.Map<Project>(createdEntity);

            return projectModel;
        }

        public async Task<Project> UpdateProjectAsync(Project project)
        {
            var projectEntity = _mapper.Map<Models.Entities.Project>(project);

            var updatedEntity = await _projectRepository.UpdateItemAsync(projectEntity);

            var projectModel = _mapper.Map<Project>(updatedEntity);

            return projectModel;
        }

        public async Task RemoveProjectAsync(Guid projectId)
        {
            await _projectRepository.RemoveItemAsync(x => x.ProjectId == projectId);
        }
    }
}
