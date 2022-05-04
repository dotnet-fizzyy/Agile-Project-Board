using System;
using System.Threading.Tasks;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ISprintService
    {
        Task<CollectionResponse<Sprint>> GetSprintsAsync();

        Task<CollectionResponse<Sprint>> GetSprintsFromEpicAsync(Guid epicId, bool includeChildren);

        Task<Sprint> GetSprintAsync(Guid sprintId);

        Task<Sprint> CreateSprintAsync(Sprint sprint);

        Task<Sprint> UpdateSprintAsync(Sprint sprint);

        Task RemoveSprintAsync(Guid sprintId);
    }
}
