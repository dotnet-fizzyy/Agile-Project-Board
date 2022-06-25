using System;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Domain.Entities;
using WebAPI.DomainAPI.Extensions;

namespace WebAPI.Application.Repositories.Common
{
	public interface IBaseReadOnlyRepository<T> 
		where T : class, IBaseEntity
	{
		Task<CollectionResult<T>> SearchForMultipleItemsAsync(int limit, int offset, bool incudeTracking);

		Task<T> SearchByIdAsync(Guid id, bool incudeTracking);

		Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression, bool incudeTracking);
	}
}
