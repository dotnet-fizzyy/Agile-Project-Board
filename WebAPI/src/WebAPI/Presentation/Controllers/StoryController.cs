using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
	[RequestBodyFilter]
    [Route("story")]
    public class StoryController : ApiController
    {
        private readonly IStoryService storyService;

        public StoryController(IStoryService storyService)
        {
            this.storyService = storyService;
        }

        /// <summary>
        /// Get all stories (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route("all")]
        public async Task<CollectionResponse<Story>> GetAllStories() 
            => await this.storyService.GeStoriesAsync();

        /// <summary>
        /// Get exact story by its id
        /// </summary>
        [HttpGet]
        [Route("{storyId:guid}")]
        public async Task<IHttpActionResult> GetStory(Guid storyId)
        {
	        var story = await this.storyService.GetStoryAsync(storyId);

	        if (story == null)
	        {
		        return this.NotFound();
	        }

	        return this.Ok(story);
        }

        /// <summary>
        /// Create story
        /// </summary>
        [HttpPost]
        public async Task<IHttpActionResult> CreateStory([FromBody] Story story)
        {
	        var createdStory = await this.storyService.CreateStoryAsync(story);

	        return this.Created(nameof(StoryController), createdStory);
        }

        /// <summary>
        /// Update story
        /// </summary>
        [HttpPut]
        public async Task<IHttpActionResult> UpdateStory([FromBody] Story story)
        {
	        var updatedStory = await this.storyService.UpdateStoryAsync(story);

	        return this.Ok(updatedStory);
        }


        /// <summary>
        /// Update story column via board DND
        /// </summary>
        [HttpPut]
        [Route("column")]
        public async Task<HttpResponseMessage> UpdateStoryColumn([FromBody]UpdateStoryColumnModel storyColumn)
        {
	        await this.storyService.UpdateStoryColumnAsync(storyColumn);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        /// <summary>
        /// Remove story via its id
        /// </summary>
        [HttpDelete]
        [Route("{storyId:guid}")]
        public async Task<HttpResponseMessage> RemoveStory(Guid storyId)
        {
	        await this.storyService.RemoveStoryAsync(storyId);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
