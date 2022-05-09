using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
	[RequestBodyFilter]
    [RoutePrefix("project")]
    public class ProjectController : ApiController
    {
        private readonly IProjectService projectService;
        private readonly IRequestHeadersProvider requestHeadersProvider;

        public ProjectController(IProjectService projectService, IRequestHeadersProvider requestHeadersProvider)
        {
            this.projectService = projectService;
            this.requestHeadersProvider = requestHeadersProvider;
        }

        /// <summary>
        /// Get all projects (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route("all")]
        public async Task<CollectionResponse<Project>> GetAllProjects() => await this.projectService.GetProjectsAsync();

        /// <summary>
        /// Get exact project by its id
        /// </summary>
        [HttpGet]
        [Route("{projectId:guid}")]
        public async Task<IHttpActionResult> GetProject(Guid projectId)
        {
            var project = await this.projectService.GeProjectAsync(projectId);

            if (project == null)
            {
                return this.NotFound();
            }

            return this.Ok(project);
        }

        /// <summary>
        /// Get exact project belongs to customer
        /// </summary>
        [UserVerificationFilter]
        [HttpGet]
        [Route("customer")]
        public async Task<IHttpActionResult> GetProjectByCustomerId()
        {
	        var userId = this.requestHeadersProvider.GetUserId(this.Request);

	        var project = await this.projectService.GetCustomerProject(userId);

	        if (project == null)
	        {
		        return this.NotFound();
	        }

	        return this.Ok(project);
        }

        /// <summary>
        /// Get project data for main page
        /// </summary>
        [UserVerificationFilter]
        [HttpGet]
        [Route("main")]
        public async Task<ProjectMainPageModel> GetProjectMainPageDataIndex()
        {
	        var userId = this.requestHeadersProvider.GetUserId(this.Request);

	        var projectMainPageDataModel = await this.projectService.GetProjectMainPageData(userId);

            return projectMainPageDataModel;
        }

        /// <summary>
        /// Get project data for board page
        /// </summary>
        [UserVerificationFilter]
        [HttpGet]
        [Route("board/{projectId:guid}")]
        public async Task<ProjectBoardPageModel> GetProjectBoardDataIndex(Guid projectId)
        {
	        var userId = this.requestHeadersProvider.GetUserId(this.Request);

            var projectBoardModel = await this.projectService.GetProjectBoardData(projectId, userId);

            return projectBoardModel;
        }

        /// <summary>
        /// Create project
        /// </summary>
        [HttpPost]
        public async Task<IHttpActionResult> CreateProject([FromBody] Project project)
        {
            var createdProject = await this.projectService.CreateProjectAsync(project);

            return this.Created(nameof(ProjectController), createdProject);
        }

        /// <summary>
        /// Update project
        /// </summary>
        [HttpPut]
        public async Task<IHttpActionResult> UpdateProject([FromBody] Project project)
        {
            var updatedProject = await this.projectService.UpdateProjectAsync(project);

            return this.Ok(updatedProject);
        }

        /// <summary>
        /// Remove project via its id
        /// </summary>
        [HttpDelete]
        [Route("{projectId:guid}")]
        public async Task<HttpResponseMessage> RemoveProject(Guid projectId)
        {
            await this.projectService.RemoveProjectAsync(projectId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
