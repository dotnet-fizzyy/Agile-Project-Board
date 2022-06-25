using System;
using System.Threading.Tasks;
using WebAPI.Domain.Entities;

namespace WebAPI.Application.Repositories
{
	public interface IBaseWriteOnlyRepository<T> 
		where T : class, IBaseEntity
	{
		Task<T> CreateEntityAsync(T entity);

		Task<T> UpdateEntityAsync(T item);

		Task RemoveEntityAsync(Guid id);

		Task CommitAsync();
	}
}
