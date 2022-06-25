using System;
using System.Data.Entity;
using System.Linq.Expressions;
using System.Threading.Tasks;
using WebAPI.Application.Repositories.Common;
using WebAPI.Domain.Entities;
using WebAPI.DomainAPI.Exceptions;
using WebAPI.DomainAPI.Extensions;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public abstract class BaseReadOnlyRepository<T> : IBaseReadOnlyRepository<T>
		where T : class, IBaseEntity
	{
		protected readonly DatabaseContext DatabaseContext;

		private readonly DbSet<T> dbSet;

		protected BaseReadOnlyRepository(DatabaseContext databaseContext)
		{
			this.DatabaseContext = databaseContext;
			this.dbSet = databaseContext.Set<T>();
		}

		public async Task<CollectionResult<T>> SearchForMultipleItemsAsync(int limit, int offset, bool incudeTracking)
		{
			// todo: work
			return null;
		}

		public async Task<T> SearchByIdAsync(Guid id, bool incudeTracking) => 
			await this.SearchForSingleItemAsync(x => x.Id == id, incudeTracking);

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

			if (entity == null)
			{
				throw new NotFoundException(typeof(T).Name, string.Empty);
			}

			return entity;
		}
	}
}
