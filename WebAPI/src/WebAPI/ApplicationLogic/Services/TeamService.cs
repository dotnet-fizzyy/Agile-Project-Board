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
        private readonly ITeamRepository teamRepository;
        private readonly IProjectRepository projectRepository;
        private readonly IUserRepository userRepository;
        private readonly IMapper mapper;

        public TeamService(
            ITeamRepository teamRepository, 
            IUserRepository userRepository, 
            IProjectRepository projectRepository, 
            IMapper mapper
        )
        {
            this.teamRepository = teamRepository;
            this.userRepository = userRepository;
            this.projectRepository = projectRepository;
            this.mapper = mapper;
        }

        public async Task<CollectionResponse<Team>> GetTeamsAsync()
        {
            var teamEntities = await this.teamRepository.SearchForMultipleItemsAsync();

            var collectionResponse = new CollectionResponse<Team>
            {
                Items = teamEntities.Select(this.mapper.Map<Team>).ToList(),
            };

            return collectionResponse;
        }

        public async Task<Team> GetTeamAsync(Guid teamId)
        {
            var teamEntity = await this.teamRepository.SearchForSingleItemAsync(x => x.TeamId == teamId);

            var teamModel = this.mapper.Map<Team>(teamEntity);

            return teamModel;
        }

        public async Task<Team> GetUserTeamAsync(Guid userId)
        {
	        var teamEntity =
                await this.teamRepository.SearchForSingleItemAsync(x => x.Users.Any(src => src.UserId == userId));

	        if (teamEntity == null)
	        {
                return null;
	        }

	        var teamModel = this.mapper.Map<Team>(teamEntity);

	        return teamModel;
        }

        public async Task<TeamManagementModel> GetTeamManagementPageData(Guid userId)
        {
	        var projectEntity = await this.projectRepository.SearchForSingleItemAsync(x => x.CustomerId == userId);

	        if (projectEntity == null)
	        {
		        return null;
	        }

	        var teamEntity = await this.teamRepository.SearchForSingleItemAsync(
                x => x.Users.Any(u => u.UserId == userId), 
                team => team.Users
            );

            var teamManagementModel = new TeamManagementModel
            {
                Project = this.mapper.Map<Project>(projectEntity),
                Team = this.mapper.Map<Team>(teamEntity),
            };

            return teamManagementModel;
        }

        public async Task<Team> CreateTeamAsync(Team team)
        {
            var teamEntity = this.mapper.Map<Models.Entities.Team>(team);

            var createdEntity = await this.teamRepository.CreateItemAsync(teamEntity);

            var teamModel = this.mapper.Map<Team>(createdEntity);

            return teamModel;
        }

        public async Task<Team> CreateTeamWithCustomerAsync(Team team, Guid customerId)
        {
	        var teamEntity = this.mapper.Map<Models.Entities.Team>(team);

	        var createdEntity = await this.teamRepository.CreateItemAsync(teamEntity);

            await this.userRepository.UpdateUserTeamAsync(customerId, createdEntity.TeamId);

	        var teamModel = this.mapper.Map<Team>(createdEntity);

	        return teamModel;
        }

        public async Task<Team> UpdateTeamAsync(Team team)
        {
            var teamEntity = this.mapper.Map<Models.Entities.Team>(team);

            var updatedEntity = await this.teamRepository.UpdateItemAsync(teamEntity);

            var teamModel = this.mapper.Map<Team>(updatedEntity);

            return teamModel;
        }

		public async Task RemoveTeamAsync(Guid teamId) =>
            await this.teamRepository.RemoveItemAsync(x => x.TeamId == teamId);
	}
}
