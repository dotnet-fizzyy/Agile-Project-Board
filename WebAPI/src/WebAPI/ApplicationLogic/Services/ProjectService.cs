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
        private readonly IProjectRepository projectRepository;
        private readonly IEpicRepository epicRepository;
        private readonly ITeamRepository teamRepository;
        private readonly ISprintRepository sprintRepository;
        private readonly IMapper mapper;

        public ProjectService(
	        IProjectRepository projectRepository, 
	        IEpicRepository epicRepository, 
	        ITeamRepository teamRepository, 
	        ISprintRepository sprintRepository, 
	        IMapper mapper
	        )
        {
            this.projectRepository = projectRepository;
            this.epicRepository = epicRepository;
            this.teamRepository = teamRepository;
            this.sprintRepository = sprintRepository;
            this.mapper = mapper;
        }

        public async Task<CollectionResponse<Project>> GetProjectsAsync()
        {
            var projectEntities = await this.projectRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Project>
            {
                Items = projectEntities.Select(this.mapper.Map<Project>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Project> GeProjectAsync(Guid projectId)
        {
            var projectEntity = await this.projectRepository.SearchForSingleItemAsync(x => x.ProjectId == projectId);

            var projectModel = this.mapper.Map<Project>(projectEntity);

            return projectModel;
        }

        public async Task<FullProjectDescription> GetCustomerProject(Guid userId)
        {
	        var projectEntity = await this.projectRepository.SearchForSingleItemAsync(x => x.CustomerId == userId);
	        if (projectEntity == null)
	        {
		        return null;
	        }

	        var epics = await this.epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectEntity.ProjectId);

	        var fullProjectDescription = new FullProjectDescription
	        {
		        Project = this.mapper.Map<Project>(projectEntity),
                Epics = epics.Select(this.mapper.Map<Epic>)
	        };

	        return fullProjectDescription;
        }

        public async Task<ProjectMainPageModel> GetProjectMainPageData(Guid userId)
        {
	        var projectMainPageData = await this.projectRepository.GetProjectMainPageDataAsync(userId);

	        var projectMainPageDataModel = this.mapper.Map<ProjectMainPageModel>(projectMainPageData);

	        return projectMainPageDataModel;
        }

        public async Task<ProjectBoardPageModel> GetProjectBoardData(Guid projectId, Guid userId)
        {
	        var projectEntity = await this.projectRepository.SearchForSingleItemAsync(x => x.ProjectId == projectId);
	        if (projectEntity == null)
	        {
		        return null;
	        }

	        var teamEntity = await this.teamRepository.SearchForSingleItemAsync(x => x.Users.Any(u => u.UserId == userId), team => team.Users);
	        if (teamEntity == null)
	        {
		        return null;
	        }

            // In the scope of this request we currently focused on data of latest epic
	        var epics = (await this.epicRepository.SearchForMultipleItemsAsync(x => x.ProjectId == projectEntity.ProjectId)).ToArray();
	        var latestEpic = epics.OrderBy(x => x.StartDate).FirstOrDefault();

	        var sprints = await this.sprintRepository.SearchForMultipleItemsAsync(x => x.EpicId == latestEpic.EpicId, sprint => sprint.Stories);

	        var projectBoardModel = new ProjectBoardPageModel
	        {
                Project = this.mapper.Map<Project>(projectEntity),
                Team = this.mapper.Map<Team>(teamEntity),
                Epics = epics.Select(this.mapper.Map<Epic>),
                EpicSprints = sprints.Select(this.mapper.Map<Sprint>),
	        };

            return projectBoardModel;
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            var projectEntity = this.mapper.Map<Models.Entities.Project>(project);

            var createdEntity = await this.projectRepository.CreateItemAsync(projectEntity);

            var projectModel = this.mapper.Map<Project>(createdEntity);

            return projectModel;
        }

        public async Task<Project> UpdateProjectAsync(Project project)
        {
            var projectEntity = this.mapper.Map<Models.Entities.Project>(project);

            var updatedEntity = await this.projectRepository.UpdateItemAsync(projectEntity);

            var projectModel = this.mapper.Map<Project>(updatedEntity);

            return projectModel;
        }

		public async Task RemoveProjectAsync(Guid projectId) => 
            await this.projectRepository.RemoveItemAsync(x => x.ProjectId == projectId);
	}
}
