using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Core.Interfaces.Repository;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.ApplicationLogic.Services
{
    public class TeamService : ITeamService
    {
        private readonly ITeamRepository _teamRepository;
        private readonly IMapper _mapper;

        public TeamService(ITeamRepository teamRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _mapper = mapper;
        }

        public async Task<CollectionResponse<Team>> GetTeamsAsync()
        {
            var teamEntities = await _teamRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Team>
            {
                Items = teamEntities.Select(_mapper.Map<Team>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetTeamAsync(Guid teamId)
        {
            var teamEntity = await _teamRepository.SearchForSingleItemAsync(x => x.TeamId == teamId);

            var teamModel = _mapper.Map<Team>(teamEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            var teamEntity = _mapper.Map<Models.Entities.Team>(team);

            var createdEntity = await _teamRepository.CreateItemAsync(teamEntity);

            var teamModel = _mapper.Map<Team>(createdEntity);

            return teamModel;
        }

        public async Task<Team> UpdateTeamAsync(Team team)
        {
            var teamEntity = _mapper.Map<Models.Entities.Team>(team);

            var updatedEntity = await _teamRepository.UpdateItemAsync(teamEntity);

            var teamModel = _mapper.Map<Team>(updatedEntity);

            return teamModel;
        }

        public async Task RemoveTeamAsync(Guid teamId)
        {
            await _teamRepository.RemoveItemAsync(x => x.TeamId == teamId);
        }
    }
}
