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
    public class TeamController : ApiController
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
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

        [HttpPost]
        [Route(RouteConstants.TeamControllerUrl)]
        public async Task<IHttpActionResult> CreateTeam([FromBody] Team team)
        {
	        var createdTeam = await _teamService.CreateTeamAsync(team);

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
