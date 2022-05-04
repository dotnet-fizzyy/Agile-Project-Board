using System;
using System.Threading.Tasks;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IStoryService
    {
        Task<CollectionResponse<Story>> GeStoriesAsync();

        Task<Story> GetStoryAsync(Guid storyId);

        Task<Story> CreateStoryAsync(Story story);

        Task<Story> UpdateStoryAsync(Story story);

        Task UpdateStoryColumnAsync(UpdateStoryColumnModel storyColumn);

        Task RemoveStoryAsync(Guid story);
    }
}
