using System.Web.Http;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.Presentation.Controllers
{
    public class EpicController : ApiController
    {
        private readonly IEpicService _epicService;

        public EpicController(IEpicService epicService)
        {
            _epicService = epicService;
        }


    }
}
