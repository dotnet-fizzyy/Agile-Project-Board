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
        protected readonly DatabaseContext DatabaseContext;
        private readonly DbSet<T> dbSet;

        protected BaseCrudRepository(DatabaseContext databaseContext)
        {
            this.DatabaseContext = databaseContext;
            this.dbSet = databaseContext.Set<T>();
        }

        public async Task<IEnumerable<T>> SearchForMultipleItemsAsync() =>
            await this.dbSet.AsNoTracking().ToListAsync();

        public async Task<IEnumerable<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression) => 
            await this.dbSet.Where(expression).AsNoTracking().ToListAsync();

        public async Task<IEnumerable<T>> SearchForMultipleItemsAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
	        var query = this.dbSet.Where(expression).AsNoTracking();

            if (includes.Length != 0)
	        {
		        query = includes.Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
	        }

            return await query.ToListAsync();
        }

        public async Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression, params Expression<Func<T, object>>[] includes)
        {
            try
            {
                var query = this.dbSet.Where(expression).AsNoTracking();

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
                this.dbSet.Add(item);

                await this.DatabaseContext.SaveChangesAsync();

                this.DatabaseContext.Entry(item).State = EntityState.Detached;

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
                this.dbSet.AddOrUpdate(item);

                await this.DatabaseContext.SaveChangesAsync();

                this.DatabaseContext.Entry(item).State = EntityState.Detached;

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
                this.dbSet.RemoveRange(this.dbSet.Where(expression));

                await this.DatabaseContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to remove entity. Reason: {e.Message}");
            }
        }
    }
}
