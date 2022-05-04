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
    public class SprintController : ApiController
    {
        private readonly ISprintService _sprintService;

        public SprintController(ISprintService sprintService)
        {
            _sprintService = sprintService;
        }

        /// <summary>
        /// Get all sprints (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.SprintControllerGetAllSprintsUrl)]
        public async Task<CollectionResponse<Sprint>> GetAllProjects() => await _sprintService.GetSprintsAsync();

        /// <summary>
        /// Get exact sprint by its id
        /// </summary>
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

        /// <summary>
        /// Get all sprints that belong to epic
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.SprintControllerGetSprintsFromEpicUrl)]
        public async Task<CollectionResponse<Sprint>> GetSprintsFromEpic(
	        [FromUri]Guid epicId, 
	        [FromUri]bool includeChildren
	        ) => await _sprintService.GetSprintsFromEpicAsync(epicId, includeChildren);

        /// <summary>
        /// Create sprint
        /// </summary>
        [HttpPost]
        [Route(RouteConstants.SprintControllerUrl)]
        public async Task<IHttpActionResult> CreateSprint([FromBody] Sprint sprint)
        {
	        var createdSprint = await _sprintService.CreateSprintAsync(sprint);

	        return Created(nameof(SprintController), createdSprint);
        }

        /// <summary>
        /// Update sprint
        /// </summary>
        [HttpPut]
        [Route(RouteConstants.SprintControllerUrl)]
        public async Task<IHttpActionResult> UpdateSprint([FromBody] Sprint sprint)
        {
	        var updatedSprint = await _sprintService.UpdateSprintAsync(sprint);

	        return Ok(updatedSprint);
        }

        /// <summary>
        /// Remove sprint via its id
        /// </summary>
        [HttpDelete]
        [Route(RouteConstants.SprintControllerGetSprintUrl)]
        public async Task<HttpResponseMessage> RemoveSprint(Guid sprintId)
        {
	        await _sprintService.RemoveSprintAsync(sprintId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
