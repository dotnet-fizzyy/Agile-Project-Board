using System;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Application.Repositories.Common;
using WebAPI.Domain.Helpers;

namespace WebAPI.Infrastructure.Database.Repositories.Common
{
	public abstract class BaseReadOnlyRepository<T> : IBaseReadOnlyRepository<T>
		where T : class
	{
		protected readonly DatabaseContext DatabaseContext;

		private readonly DbSet<T> dbSet;

		protected BaseReadOnlyRepository(DatabaseContext databaseContext)
		{
			this.DatabaseContext = databaseContext;
			this.dbSet = databaseContext.Set<T>();
		}

		public async Task<T> SearchByIdAsync(Guid id, bool incudeTracking)
		{
			// todo: refactor with PK search, set base reference for entities, reuse overloading
			var entity = await this.dbSet.SingleOrDefaultAsync();

			Handle(entity);

			return entity;
		}

		public Task<CollectionResult<T>> SearchForMultipleItemsAsync(int limit, int offset, bool incudeTracking) => throw new NotImplementedException();

		public async Task<T> SearchForSingleItemAsync(Expression<Func<T, bool>> expression, bool incudeTracking)
		{
			T entity;

			if (incudeTracking)
			{
				entity = await this.dbSet.SingleOrDefaultAsync(expression);
			}
			else
			{
				entity = await this.dbSet.AsNoTracking().SingleOrDefaultAsync(expression);
			}

			Handle(entity);

			return entity;
		}

		private static void Handle(T entity)
		{
			if (entity == null)
			{
				// todo: update exceptions hierarchy
				throw new Exception();
			}
		}
	}
}
