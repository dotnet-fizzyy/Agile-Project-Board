using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Core.Interfaces.Repository;

namespace WebAPI.Infrastructure.MSSQL.Repository
{
    public abstract class BaseCrudRepository<T> : IBaseCrudRepository<T> where T : class
    {
        private readonly DatabaseContext _databaseContext;
        private readonly DbSet<T> _dbSet;

        protected BaseCrudRepository(DatabaseContext databaseContext)
        {
            _databaseContext = databaseContext;
            _dbSet = databaseContext.Set<T>();
        }

        public async Task<IEnumerable<T>> SearchForMultipleItemsAsync()
        {
            return await _dbSet.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression)
        {
            return await _dbSet.Where(expression).AsNoTracking().ToListAsync();
        }

        public async Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            try
            {
                var query = _dbSet.Where(expression).AsNoTracking();

                if (includes.Length != 0)
                {
                    query = includes.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
                }

                return await query.SingleOrDefaultAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to find entity. Reason: {e.Message}");
            }
        }

        public async Task<T> CreateItemAsync(T item)
        {
            try
            {
                _dbSet.Add(item);

                await _databaseContext.SaveChangesAsync();

                _databaseContext.Entry(item).State = EntityState.Detached;

                return item;
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to add entity. Reason: {e.Message}");
            }
        }

        public async Task<T> UpdateItemAsync(T item)
        {
            try
            {
                _dbSet.AddOrUpdate(item);

                await _databaseContext.SaveChangesAsync();

                _databaseContext.Entry(item).State = EntityState.Detached;

                return item;
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to update entity. Reason: {e.Message}");
            }
        }

        public async Task RemoveItemAsync(Expression<Func<T, bool>> expression)
        {
            try
            {
                _dbSet.RemoveRange(_dbSet.Where(expression));

                await _databaseContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to remove entity. Reason: {e.Message}");
            }
        }
    }
}
