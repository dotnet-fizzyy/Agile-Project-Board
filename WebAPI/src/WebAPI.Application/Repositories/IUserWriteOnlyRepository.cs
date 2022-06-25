using System;
using WebAPI.Domain.Entities;

namespace WebAPI.Application.Repositories
{
	public interface IUserWriteOnlyRepository : IBaseWriteOnlyRepository<User>
	{
		void UpdatePassword(Guid userId, string password);

		void UpdateActivityStatus(Guid userId, bool isActive);
	}
}
