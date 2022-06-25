using System;
using System.Threading.Tasks;
using AutoMapper;
using WebAPI.Application.Models.User;
using WebAPI.Application.Repositories;
using WebAPI.Application.Utilities;

namespace WebAPI.Application.Services.User.Commands
{
	public class UserCommandsUserCase : IUserCommandsUseCase
	{
		private readonly IUserWriteOnlyRepository userWriteOnlyRepository;
		private readonly IMapper mapper;

		public UserCommandsUserCase(IUserWriteOnlyRepository userWriteOnlyRepository, IMapper mapper)
		{
			this.userWriteOnlyRepository = userWriteOnlyRepository;
			this.mapper = mapper;
		}

		public Task<UserResult> CreateCustomerAsync(UserAction user) =>
			this.CreateUserAsync(user, Domain.Enums.UserRole.Customer);

		public Task<UserResult> CreateUserAsync(UserAction user) =>
			this.CreateUserAsync(user, Domain.Enums.UserRole.Engineer);

		public async Task<UserResult> UpdateAsync(UserAction user)
		{
			var userEntity = this.mapper.Map<Domain.Entities.User>(user);

			var updatedUserEntity = await this.userWriteOnlyRepository.UpdateEntityAsync(userEntity);

			await this.userWriteOnlyRepository.CommitAsync();

			return this.mapper.Map<UserResult>(updatedUserEntity);
		}

		public async Task RemoveByIdAsync(Guid id)
		{
			await this.userWriteOnlyRepository.RemoveEntityAsync(id);

			await this.userWriteOnlyRepository.CommitAsync();
		}

		public async Task UpdatePasswordAsync(UserPasswordAction userPassword)
		{
			var hashedPassword = AppHash.HashPassword(userPassword.Password);

			this.userWriteOnlyRepository.UpdatePassword(userPassword.UserId, hashedPassword);

			await this.userWriteOnlyRepository.CommitAsync();
		}

		public async Task UpdateActivityStatusAsync(UserActivityStatusAction userActivityStatus)
		{
			this.userWriteOnlyRepository.UpdateActivityStatus(userActivityStatus.UserId, userActivityStatus.IsActive);

			await this.userWriteOnlyRepository.CommitAsync();
		}


		private async Task<UserResult> CreateUserAsync(UserAction user, Domain.Enums.UserRole assignmentRole)
		{
			var userEntity = this.mapper.Map<Domain.Entities.User>(user);
			userEntity.Password = AppHash.HashPassword(userEntity.Password);
			userEntity.UserRole = assignmentRole;

			var createdUserEntity = await this.userWriteOnlyRepository.CreateEntityAsync(userEntity);

			await this.userWriteOnlyRepository.CommitAsync();

			return this.mapper.Map<UserResult>(createdUserEntity);
		}
	}
}
