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
    public class EpicController : ApiController
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }

        /// <summary>
        /// Get all epics (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.EpicControllerGetAllEpicsUrl)]
        public async Task<CollectionResponse<Epic>> GetAllEpics() => await _epicService.GetEpicsAsync();

        /// <summary>
        /// Get epic by its id
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.EpicControllerGetEpicUrl)]
        public async Task<IHttpActionResult> GetEpic(Guid epicId)
        {
	        var epic = await _epicService.GetEpicAsync(epicId);

	        if (epic == null)
	        {
		        return NotFound();
	        }

	        return Ok(epic);
        }

        /// <summary>
        /// Create epic
        /// </summary>
        [HttpPost]
        [Route(RouteConstants.EpicControllerUrl)]
        public async Task<IHttpActionResult> CreateEpic([FromBody] Epic epic)
        {
	        var createdEpic = await _epicService.CreateEpicAsync(epic);

	        return Created(nameof(EpicController), createdEpic);
        }

        /// <summary>
        /// Update epic
        /// </summary>
        [HttpPut]
        [Route(RouteConstants.EpicControllerUrl)]
        public async Task<IHttpActionResult> UpdateProject([FromBody] Epic epic)
        {
	        var updatedEpic = await _epicService.UpdateEpicAsync(epic);

	        return Ok(updatedEpic);
        }

        /// <summary>
        /// Remove epic via its id
        /// </summary>
        [HttpDelete]
        [Route(RouteConstants.EpicControllerGetEpicUrl)]
        public async Task<HttpResponseMessage> RemoveProject(Guid epicId)
        {
	        await _epicService.RemoveEpicAsync(epicId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
