using System.Web.Http;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.Presentation.Controllers
{
    public class StoryController : ApiController
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }
    }
}
