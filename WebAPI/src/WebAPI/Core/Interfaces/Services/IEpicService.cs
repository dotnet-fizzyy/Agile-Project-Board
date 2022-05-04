using System;
using System.Threading.Tasks;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IEpicService
    {
        Task<CollectionResponse<Epic>> GetEpicsAsync();

        Task<Epic> GetEpicAsync(Guid epicId);

        Task<Epic> CreateEpicAsync(Epic epic);

        Task<Epic> UpdateEpicAsync(Epic epic);

        Task RemoveEpicAsync(Guid epicId);
    }
}
