using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Core.Constants;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
	[RequestBodyFilter]
    public class ProjectController : ApiController
    {
        private readonly IProjectService _projectService;
        private readonly IRequestHeadersProvider _requestHeadersProvider;

        public ProjectController(IProjectService projectService, IRequestHeadersProvider requestHeadersProvider)
        {
            _projectService = projectService;
            _requestHeadersProvider = requestHeadersProvider;
        }

        /// <summary>
        /// Get all projects (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.ProjectControllerGetAllProjectsUrl)]
        public async Task<CollectionResponse<Project>> GetAllProjects() => await _projectService.GetProjectsAsync();

        /// <summary>
        /// Get exact project by its id
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.ProjectControllerGetProjectUrl)]
        public async Task<IHttpActionResult> GetProject(Guid projectId)
        {
            var project = await _projectService.GeProjectAsync(projectId);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        /// <summary>
        /// Get exact project belongs to customer
        /// </summary>
        [UserVerificationFilter]
        [HttpGet]
        [Route(RouteConstants.ProjectControllerCreateProjectWithCustomerUrl)]
        public async Task<IHttpActionResult> GetProjectByCustomerId()
        {
	        var userId = _requestHeadersProvider.GetUserId(Request);

	        var project = await _projectService.GetCustomerProject(userId);

	        if (project == null)
	        {
		        return NotFound();
	        }

	        return Ok(project);
        }

        /// <summary>
        /// Get project data for main page
        /// </summary>
        [UserVerificationFilter]
        [HttpGet]
        [Route(RouteConstants.ProjectControllerMainPageUrl)]
        public async Task<ProjectMainPageModel> GetProjectMainPageDataIndex()
        {
	        var userId = _requestHeadersProvider.GetUserId(Request);

	        var projectMainPageDataModel = await _projectService.GetProjectMainPageData(userId);

            return projectMainPageDataModel;
        }

        /// <summary>
        /// Get project data for board page
        /// </summary>
        [UserVerificationFilter]
        [HttpGet]
        [Route(RouteConstants.ProjectControllerBoardPageUrl)]
        public async Task<ProjectBoardPageModel> GetProjectBoardDataIndex(Guid projectId)
        {
	        var userId = _requestHeadersProvider.GetUserId(Request);

            var projectBoardModel = await _projectService.GetProjectBoardData(projectId, userId);

            return projectBoardModel;
        }

        /// <summary>
        /// Create project
        /// </summary>
        [HttpPost]
        [Route(RouteConstants.ProjectControllerUrl)]
        public async Task<IHttpActionResult> CreateProject([FromBody] Project project)
        {
            var createdProject = await _projectService.CreateProjectAsync(project);

            return Created(nameof(ProjectController), createdProject);
        }

        /// <summary>
        /// Update project
        /// </summary>
        [HttpPut]
        [Route(RouteConstants.ProjectControllerUrl)]
        public async Task<IHttpActionResult> UpdateProject([FromBody] Project project)
        {
            var updatedProject = await _projectService.UpdateProjectAsync(project);

            return Ok(updatedProject);
        }

        /// <summary>
        /// Remove project via its id
        /// </summary>
        [HttpDelete]
        [Route(RouteConstants.ProjectControllerGetProjectUrl)]
        public async Task<HttpResponseMessage> RemoveProject(Guid projectId)
        {
            await _projectService.RemoveProjectAsync(projectId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
