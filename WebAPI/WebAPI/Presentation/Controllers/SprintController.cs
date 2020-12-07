using System.Web.Http;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.Presentation.Controllers
{
    public class SprintController : ApiController
    {
        private readonly ISprintService _sprintService;

        public SprintController(ISprintService sprintService)
        {
            _sprintService = sprintService;
        }
    }
}
