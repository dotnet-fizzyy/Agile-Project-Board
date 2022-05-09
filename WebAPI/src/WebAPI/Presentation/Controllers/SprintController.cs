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
    [RoutePrefix("sprint")]
    public class SprintController : ApiController
    {
        private readonly ISprintService sprintService;

        public SprintController(ISprintService sprintService)
        {
            this.sprintService = sprintService;
        }

        /// <summary>
        /// Get all sprints (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route("all")]
        public async Task<CollectionResponse<Sprint>> GetAllProjects() => 
            await this.sprintService.GetSprintsAsync();

        /// <summary>
        /// Get exact sprint by its id
        /// </summary>
        [HttpGet]
        [Route("{sprintId:guid}")]
        public async Task<IHttpActionResult> GetSprint(Guid sprintId)
        {
	        var sprint = await this.sprintService.GetSprintAsync(sprintId);

	        if (sprint == null)
	        {
		        return this.NotFound();
	        }

	        return this.Ok(sprint);
        }

        /// <summary>
        /// Get all sprints that belong to epic
        /// </summary>
        [HttpGet]
        [Route("epic")]
        public async Task<CollectionResponse<Sprint>> GetSprintsFromEpic(
	        [FromUri]Guid epicId, 
	        [FromUri]bool includeChildren
	        ) => 
            await this.sprintService.GetSprintsFromEpicAsync(epicId, includeChildren);

        /// <summary>
        /// Create sprint
        /// </summary>
        [HttpPost]
        public async Task<IHttpActionResult> CreateSprint([FromBody] Sprint sprint)
        {
	        var createdSprint = await this.sprintService.CreateSprintAsync(sprint);

	        return this.Created(nameof(SprintController), createdSprint);
        }

        /// <summary>
        /// Update sprint
        /// </summary>
        [HttpPut]
        public async Task<IHttpActionResult> UpdateSprint([FromBody] Sprint sprint)
        {
	        var updatedSprint = await this.sprintService.UpdateSprintAsync(sprint);

	        return this.Ok(updatedSprint);
        }

        /// <summary>
        /// Remove sprint via its id
        /// </summary>
        [HttpDelete]
        [Route("{sprintId:guid}")]
        public async Task<HttpResponseMessage> RemoveSprint(Guid sprintId)
        {
	        await this.sprintService.RemoveSprintAsync(sprintId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
