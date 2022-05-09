using System;
using System.Threading.Tasks;

namespace WebAPI.Application.Repositories.Common
{
	public interface IBaseWriteOnlyRepository<T> where T : class
	{
		Task<T> CreateEntityAsync(T entity, bool commitImmediatly);

		Task<T> UpdateEntityAsync(T item, bool commitImmediatly);

		Task RemoveEntityAsync(Guid id);

		Task CommitAsync();
	}
}
