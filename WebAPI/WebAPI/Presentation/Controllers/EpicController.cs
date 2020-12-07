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
    public class EpicController : ApiController
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }

        [HttpGet]
        [Route(RouteConstants.EpicControllerGetAllEpicsUrl)]
        public async Task<CollectionResponse<Epic>> GetAllEpics() => await _epicService.GetEpicsAsync();

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

        [HttpPost]
        [Route(RouteConstants.EpicControllerUrl)]
        public async Task<IHttpActionResult> CreateEpic([FromBody] Epic epic)
        {
	        var createdEpic = await _epicService.CreateEpicAsync(epic);

	        return Created(nameof(EpicController), createdEpic);
        }

        [HttpPut]
        [Route(RouteConstants.EpicControllerUrl)]
        public async Task<IHttpActionResult> UpdateProject([FromBody] Epic epic)
        {
	        var updatedEpic = await _epicService.UpdateEpicAsync(epic);

	        return Ok(updatedEpic);
        }

        [HttpDelete]
        [Route(RouteConstants.EpicControllerGetEpicUrl)]
        public async Task<HttpResponseMessage> RemoveProject(Guid epicId)
        {
	        await _epicService.RemoveEpicAsync(epicId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
