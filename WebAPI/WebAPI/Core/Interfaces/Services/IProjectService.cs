using System;
using System.Threading.Tasks;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Core.Interfaces.Services
{
    public interface IProjectService
    {
        Task<CollectionResponse<Project>> GetProjectsAsync();

        Task<Project> GeProjectAsync(Guid projectId);

        Task<FullProjectDescription> GetCustomerProject(Guid userId);

        Task<Project> CreateProjectAsync(Project project);

        Task<Project> CreateProjectWithCustomerAsync(Project project, Guid userId);

        Task<Project> UpdateProjectAsync(Project project);

        Task RemoveProjectAsync(Guid projectId);
    }
}
