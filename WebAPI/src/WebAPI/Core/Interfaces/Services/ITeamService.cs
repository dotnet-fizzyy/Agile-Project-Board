using System;
using System.Threading.Tasks;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Core.Interfaces.Services
{
    public interface ITeamService
    {
        Task<CollectionResponse<Team>> GetTeamsAsync();

        Task<Team> GetTeamAsync(Guid teamId);

        Task<Team> GetUserTeamAsync(Guid userId);

        Task<TeamManagementModel> GetTeamManagementPageData(Guid userId);

        Task<Team> CreateTeamAsync(Team team);

        Task<Team> CreateTeamWithCustomerAsync(Team team, Guid customerId);

        Task<Team> UpdateTeamAsync(Team team);

        Task RemoveTeamAsync(Guid teamId);
    }
}
