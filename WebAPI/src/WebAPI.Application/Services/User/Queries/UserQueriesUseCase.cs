using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Application.Models.User;
using WebAPI.Application.Repositories;
using WebAPI.Application.Utilities;
using WebAPI.DomainAPI.Extensions;

namespace WebAPI.Application.Services.User.Queries
{
	public class UserQueriesUseCase : IUserQueriesUseCase
	{
		private readonly IUserReadOnlyRepository userReadOnlyRepository;
		private readonly IMapper mapper;

		public UserQueriesUseCase(IUserReadOnlyRepository userReadRepository, IMapper mapper)
		{
			this.userReadOnlyRepository = userReadRepository;
			this.mapper = mapper;
		}

		public async Task<UserResult> AuthenticateUser(AuthUser authUser)
		{
			var hashedPassword = AppHash.HashPassword(authUser.Password);

			var user = await this.userReadOnlyRepository.AuthenticateUserAsync(authUser.Username, hashedPassword);

			return this.mapper.Map<UserResult>(user);
		}

		public async Task<UserResult> GetUserByIdAsync(Guid id)
		{
			var user = await this.userReadOnlyRepository.SearchByIdAsync(id, incudeTracking: false);

			return this.mapper.Map<UserResult>(user);
		}

		public async Task<CollectionResult<UserResult>> GetUsersAsync(int limit, int offset)
		{
			var usersCollection = await this.userReadOnlyRepository
				.SearchForMultipleItemsAsync(limit, offset, incudeTracking: false);

			return new CollectionResult<UserResult>
			{
				Items = usersCollection.Items
					.Select(this.mapper.Map<UserResult>)
					.ToList(),
			};
		}
	}
}
