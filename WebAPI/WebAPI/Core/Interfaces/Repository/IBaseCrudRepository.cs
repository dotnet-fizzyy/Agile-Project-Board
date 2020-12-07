using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace WebAPI.Core.Interfaces.Repository
{
    public interface IBaseCrudRepository<T> where T : class
    {
        Task<IEnumerable<T>> SearchForMultipleItemsAsync();

        Task<IEnumerable<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression);

        Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes);

        Task<T> CreateItemAsync(T item);

        Task<T> UpdateItemAsync(T item);

        Task RemoveItemAsync(Expression<Func<T, bool>> expression);
    }
}
