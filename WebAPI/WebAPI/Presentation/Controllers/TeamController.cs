using System.Web.Http;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.Presentation.Controllers
{
    public class TeamController : ApiController
    {
        private readonly ITeamService _teamService;

        public TeamController(ITeamService teamService)
        {
            _teamService = teamService;
        }
    }
}
