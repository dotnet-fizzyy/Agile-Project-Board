using System;
using System.Linq;
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
    public class TeamController : ApiController
    {
        private readonly ITeamService _teamService;
        private readonly IRequestHeadersProvider _requestHeadersProvider;

        public TeamController(ITeamService teamService, IRequestHeadersProvider requestHeadersProvider)
        {
            _teamService = teamService;
            _requestHeadersProvider = requestHeadersProvider;
        }

        [HttpGet]
        [Route(RouteConstants.TeamControllerGetAllTeamsUrl)]
        public async Task<CollectionResponse<Team>> GetTeams() => await _teamService.GetTeamsAsync();

        [HttpGet]
        [Route(RouteConstants.TeamControllerGetTeamUrl)]
        public async Task<IHttpActionResult> GetTeam(Guid teamId)
        {
	        var team = await _teamService.GetTeamAsync(teamId);

	        if (team == null)
	        {
		        return NotFound();
	        }

	        return Ok(team);
        }

        [HttpGet]
        [Route(RouteConstants.TeamControllerGetUserTeamUrl)]
        public async Task<IHttpActionResult> GetUserTeam(Guid userId)
        {
            var userTeam = await _teamService.GetUserTeamAsync(userId);

            if (userTeam == null)
            {
	            return NotFound();
            }

	        return Ok(userTeam);
        }

        [HttpGet]
        [Route(RouteConstants.TeamControllerTeamManagementUrl)]
        public async Task<IHttpActionResult> GetTeamManagementPageIndex()
        {
	        var userId = _requestHeadersProvider.GetUserId(Request);

	        if (userId == null)
	        {
		        return BadRequest();
	        }

	        var teamManagementPageData = await _teamService.GetTeamManagementPageData((Guid)userId);

	        if (teamManagementPageData == null)
	        {
		        return NotFound();
	        }

            return Ok(teamManagementPageData);
        }

        [HttpPost]
        [Route(RouteConstants.TeamControllerUrl)]
        public async Task<IHttpActionResult> CreateTeam([FromBody] Team team)
        {
	        var createdTeam = await _teamService.CreateTeamAsync(team);

	        return Created(nameof(TeamController), createdTeam);
        }

        [HttpPost]
        [Route(RouteConstants.TeamControllerCreateTeamWithCustomerUrl)]
        public async Task<IHttpActionResult> CreateTeamWithCustomer([FromBody] Team team)
        {
	        var userId = _requestHeadersProvider.GetUserId(Request);

            if (userId == null)
	        {
		        return BadRequest();
	        }

	        var createdTeam = await _teamService.CreateTeamWithCustomerAsync(team, (Guid)userId);

	        return Created(nameof(TeamController), createdTeam);
        }

        [HttpPut]
        [Route(RouteConstants.TeamControllerUrl)]
        public async Task<IHttpActionResult> UpdateTeam([FromBody] Team team)
        {
	        var updatedTeam = await _teamService.UpdateTeamAsync(team);

	        return Ok(updatedTeam);
        }

        [HttpDelete]
        [Route(RouteConstants.TeamControllerGetTeamUrl)]
        public async Task<HttpResponseMessage> RemoveTeam(Guid teamId)
        {
	        await _teamService.RemoveTeamAsync(teamId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
