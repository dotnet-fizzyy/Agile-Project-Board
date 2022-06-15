using System;
using WebAPI.Application.Repositories.Common;

namespace WebAPI.Application.Repositories.User
{
	public interface IUserWriteOnlyRepository : IBaseWriteOnlyRepository<Domain.Entities.User>
	{
		void UpdatePassword(Guid userId, string password);

		void UpdateActivityStatus(Guid userId, bool isActive);
	}
}
