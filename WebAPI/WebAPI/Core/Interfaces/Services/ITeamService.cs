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

        Task<Team> CreateTeamAsync(Team team);

        Task<Team> UpdateTeamAsync(Team team);

        Task RemoveTeamAsync(Guid teamId);
    }
}
