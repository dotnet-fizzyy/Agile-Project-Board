using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Core.Constants;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Presentation.Controllers
{
    public class ProjectController : ApiController
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public async Task<CollectionResponse<Project>> GetAllProjects()
        {
            return await _projectService.GetProjectsAsync();
        }


        [HttpGet]
        [Route(RouteConstants.UserControllerGetUserUrl)]
        public async Task<IHttpActionResult> GetProject(Guid projectId)
        {
            var project = await _projectService.GeProjectAsync(projectId);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        [HttpPost]
        [Route(RouteConstants.UserControllerUrl)]
        public async Task<IHttpActionResult> CreateProject([FromBody] Project project)
        {
            var createdProject = await _projectService.CreateProjectAsync(project);

            return Created(nameof(ProjectController), createdProject);
        }

        [HttpPut]
        [Route(RouteConstants.UserControllerUrl)]
        public async Task<IHttpActionResult> UpdateProject([FromBody] Project project)
        {
            var updatedProject = await _projectService.UpdateProjectAsync(project);

            return Ok(updatedProject);
        }

        [HttpDelete]
        [Route(RouteConstants.UserControllerGetUserUrl)]
        public async Task<HttpResponseMessage> RemoveUser(Guid projectId)
        {
            await _projectService.RemoveProjectAsync(projectId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
