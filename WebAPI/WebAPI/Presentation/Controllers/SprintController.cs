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
    public class SprintController : ApiController
    {
        private readonly ISprintService _sprintService;

        public SprintController(ISprintService sprintService)
        {
            _sprintService = sprintService;
        }

        [HttpGet]
        [Route(RouteConstants.SprintControllerGetAllSprintsUrl)]
        public async Task<CollectionResponse<Sprint>> GetAllProjects() => await _sprintService.GetSprintsAsync();

        [HttpGet]
        [Route(RouteConstants.SprintControllerGetSprintUrl)]
        public async Task<IHttpActionResult> GetSprint(Guid sprintId)
        {
	        var sprint = await _sprintService.GetSprintAsync(sprintId);

	        if (sprint == null)
	        {
		        return NotFound();
	        }

	        return Ok(sprint);
        }

        [HttpPost]
        [Route(RouteConstants.SprintControllerUrl)]
        public async Task<IHttpActionResult> CreateSprint([FromBody] Sprint sprint)
        {
	        var createdSprint = await _sprintService.CreateSprintAsync(sprint);

	        return Created(nameof(SprintController), createdSprint);
        }

        [HttpPut]
        [Route(RouteConstants.SprintControllerUrl)]
        public async Task<IHttpActionResult> UpdateProject([FromBody] Sprint sprint)
        {
	        var updatedSprint = await _sprintService.UpdateSprintAsync(sprint);

	        return Ok(updatedSprint);
        }

        [HttpDelete]
        [Route(RouteConstants.SprintControllerGetSprintUrl)]
        public async Task<HttpResponseMessage> RemoveProject(Guid sprintId)
        {
	        await _sprintService.RemoveSprintAsync(sprintId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
