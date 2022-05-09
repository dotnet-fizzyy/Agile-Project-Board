using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Application.Models.User;
using WebAPI.Application.Repositories.User;
using WebAPI.Domain.Helpers;

namespace WebAPI.Application.Services.User.Queries
{
	public class UserQueriesUseCase : IUserQueriesUseCase
	{
		private readonly IUserReadOnlyRepository userReadRepository;
		private readonly IMapper mapper;

		public UserQueriesUseCase(IUserReadOnlyRepository userReadRepository, IMapper mapper)
		{
			this.userReadRepository = userReadRepository;
			this.mapper = mapper;
		}

		public async Task<UserResult> GetUserByIdAsync(Guid id)
		{
			var includeTracking = false;

			var user = await this.userReadRepository.SearchByIdAsync(id, includeTracking);

			return this.mapper.Map<UserResult>(user);
		}

		public async Task<CollectionResult<UserResult>> GetUsers(int limit, int offset)
		{
			var includeTracking = false;

			var usersCollection = await this.userReadRepository
				.SearchForMultipleItemsAsync(limit, offset, includeTracking);

			return new CollectionResult<UserResult>
			{
				Items = usersCollection.Items
					.Select(this.mapper.Map<UserResult>)
					.ToList(),
			};
		}
	}
}
