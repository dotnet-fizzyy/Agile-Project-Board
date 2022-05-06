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
    [RequestBodyFilterAttribute]
    public class TeamController : ApiController
    {
        private readonly ITeamService teamService;
        private readonly IRequestHeadersProvider requestHeadersProvider;

        public TeamController(ITeamService teamService, IRequestHeadersProvider requestHeadersProvider)
        {
            this.teamService = teamService;
            this.requestHeadersProvider = requestHeadersProvider;
        }

        /// <summary>
        /// Get all teams (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.TeamControllerGetAllTeamsUrl)]
        public async Task<CollectionResponse<Team>> GetTeams() => await this.teamService.GetTeamsAsync();

        /// <summary>
        /// Get exact team by its id
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.TeamControllerGetTeamUrl)]
        public async Task<IHttpActionResult> GetTeam(Guid teamId)
        {
	        var team = await this.teamService.GetTeamAsync(teamId);

	        if (team == null)
	        {
		        return this.NotFound();
	        }

	        return this.Ok(team);
        }

        /// <summary>
        /// Get exact team where user is attached
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.TeamControllerGetUserTeamUrl)]
        public async Task<IHttpActionResult> GetUserTeam(Guid userId)
        {
            var userTeam = await this.teamService.GetUserTeamAsync(userId);

            if (userTeam == null)
            {
	            return this.NotFound();
            }

	        return this.Ok(userTeam);
        }

        /// <summary>
        /// Get team for team management page, requires customer id
        /// </summary>
        [UserVerificationFilterAttribute]
        [HttpGet]
        [Route(RouteConstants.TeamControllerTeamManagementUrl)]
        public async Task<IHttpActionResult> GetTeamManagementPageIndex()
        {
	        var userId = this.requestHeadersProvider.GetUserId(this.Request);

	        var teamManagementPageData = await this.teamService.GetTeamManagementPageData(userId);

	        if (teamManagementPageData == null)
	        {
		        return this.NotFound();
	        }

            return this.Ok(teamManagementPageData);
        }

        /// <summary>
        /// Create team
        /// </summary>
        [HttpPost]
        [Route(RouteConstants.TeamControllerUrl)]
        public async Task<IHttpActionResult> CreateTeam([FromBody] Team team)
        {
	        var createdTeam = await this.teamService.CreateTeamAsync(team);

	        return this.Created(nameof(TeamController), createdTeam);
        }

        /// <summary>
        /// Create team and updated customer profile with owned team
        /// </summary>
        [UserVerificationFilterAttribute]
        [HttpPost]
        [Route(RouteConstants.TeamControllerCreateTeamWithCustomerUrl)]
        public async Task<IHttpActionResult> CreateTeamWithCustomer([FromBody] Team team)
        {
	        var userId = this.requestHeadersProvider.GetUserId(this.Request);

	        var createdTeam = await this.teamService.CreateTeamWithCustomerAsync(team, userId);

	        return this.Created(nameof(TeamController), createdTeam);
        }

        /// <summary>
        /// Update team
        /// </summary>
        [HttpPut]
        [Route(RouteConstants.TeamControllerUrl)]
        public async Task<IHttpActionResult> UpdateTeam([FromBody] Team team)
        {
	        var updatedTeam = await this.teamService.UpdateTeamAsync(team);

	        return this.Ok(updatedTeam);
        }

        /// <summary>
        /// Remove team
        /// </summary>
        [HttpDelete]
        [Route(RouteConstants.TeamControllerGetTeamUrl)]
        public async Task<HttpResponseMessage> RemoveTeam(Guid teamId)
        {
	        await this.teamService.RemoveTeamAsync(teamId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
