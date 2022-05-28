using System;
using System.Threading.Tasks;
using WebAPI.Domain.Entities;

namespace WebAPI.Application.Repositories.Common
{
	public interface IBaseWriteOnlyRepository<T> 
		where T : class, IBaseEntity
	{
		Task<T> CreateEntityAsync(T entity, bool commitImmediatly);

		Task<T> UpdateEntityAsync(T item, bool commitImmediatly);

		Task RemoveEntityAsync(Guid id);

		Task CommitAsync();
	}
}
