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
        private readonly IProjectRepository _projectRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public TeamService(ITeamRepository teamRepository, IUserRepository userRepository, IProjectRepository projectRepository, IMapper mapper)
        {
            _teamRepository = teamRepository;
            _userRepository = userRepository;
            _projectRepository = projectRepository;
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

        public async Task<Team> GetUserTeamAsync(Guid userId)
        {
	        var teamEntity =
		        await _teamRepository.SearchForSingleItemAsync(x => x.Users.Any(src => src.UserId == userId));

	        if (teamEntity == null)
	        {
                return null;
	        }

	        var teamModel = _mapper.Map<Team>(teamEntity);

	        return teamModel;
        }

        public async Task<TeamManagementModel> GetTeamManagementPageData(Guid userId)
        {
	        var projectEntity = await _projectRepository.SearchForSingleItemAsync(x => x.CustomerId == userId);

	        if (projectEntity == null)
	        {
		        return null;
	        }

	        var teamEntity = await _teamRepository.SearchForSingleItemAsync(x => x.Users.Any(u => u.UserId == userId), team => team.Users);

            var teamManagementModel = new TeamManagementModel
            {
                Project = _mapper.Map<Project>(projectEntity),
                Team = _mapper.Map<Team>(teamEntity),
            };

            return teamManagementModel;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            var teamEntity = _mapper.Map<Models.Entities.Team>(team);

            var createdEntity = await _teamRepository.CreateItemAsync(teamEntity);

            var teamModel = _mapper.Map<Team>(createdEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamWithCustomerAsync(Team team, Guid customerId)
        {
	        var teamEntity = _mapper.Map<Models.Entities.Team>(team);

	        var createdEntity = await _teamRepository.CreateItemAsync(teamEntity);

	        await _userRepository.UpdateUserTeamAsync(customerId, createdEntity.TeamId);

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
