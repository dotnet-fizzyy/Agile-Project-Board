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
    public class StoryController : ApiController
    {
        private readonly IStoryService _storyService;

        public StoryController(IStoryService storyService)
        {
            _storyService = storyService;
        }

        /// <summary>
        /// Get all stories (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.StoryControllerGetAllStoriesUrl)]
        public async Task<CollectionResponse<Story>> GetAllStories() => await _storyService.GeStoriesAsync();

        /// <summary>
        /// Get exact story by its id
        /// </summary>
        [HttpGet]
        [Route(RouteConstants.StoryControllerGetStoryUrl)]
        public async Task<IHttpActionResult> GetStory(Guid storyId)
        {
	        var story = await _storyService.GetStoryAsync(storyId);

	        if (story == null)
	        {
		        return NotFound();
	        }

	        return Ok(story);
        }

        /// <summary>
        /// Create story
        /// </summary>
        [HttpPost]
        [Route(RouteConstants.StoryControllerUrl)]
        public async Task<IHttpActionResult> CreateStory([FromBody] Story story)
        {
	        var createdStory = await _storyService.CreateStoryAsync(story);

	        return Created(nameof(StoryController), createdStory);
        }

        /// <summary>
        /// Update story
        /// </summary>
        [HttpPut]
        [Route(RouteConstants.StoryControllerUrl)]
        public async Task<IHttpActionResult> UpdateStory([FromBody] Story story)
        {
	        var updatedStory = await _storyService.UpdateStoryAsync(story);

	        return Ok(updatedStory);
        }


        /// <summary>
        /// Update story column via board DND
        /// </summary>
        [HttpPut]
        [Route(RouteConstants.StoryControllerUpdateStoryColumnUrl)]
        public async Task<HttpResponseMessage> UpdateStoryColumn([FromBody]UpdateStoryColumnModel storyColumn)
        {
	        await _storyService.UpdateStoryColumnAsync(storyColumn);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        /// <summary>
        /// Remove story via its id
        /// </summary>
        [HttpDelete]
        [Route(RouteConstants.StoryControllerGetStoryUrl)]
        public async Task<HttpResponseMessage> RemoveStory(Guid storyId)
        {
	        await _storyService.RemoveStoryAsync(storyId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
