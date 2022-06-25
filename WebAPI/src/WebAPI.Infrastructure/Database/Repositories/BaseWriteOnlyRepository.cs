using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Threading.Tasks;
using WebAPI.Application.Repositories.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories
{
	public abstract class BaseWriteOnlyRepository<T> : IBaseWriteOnlyRepository<T>
		where T : class, IBaseEntity
	{
		protected readonly DatabaseContext DatabaseContext;

		private readonly DbSet<T> dbSet;

		protected BaseWriteOnlyRepository(DatabaseContext databaseContext)
		{
			this.DatabaseContext = databaseContext;
			this.dbSet = databaseContext.Set<T>();
		}

		public async Task<T> CreateEntityAsync(T entity)
		{
			try
			{
				this.dbSet.Add(entity);

				return entity;
			}
			// todo: replace with custom
			catch (Exception ex)
			{
				throw new Exception($"Unable to add entity. Reason: {ex.Message}");
			}
		}

		public async Task<T> UpdateEntityAsync(T item)
		{
			try
			{
				this.dbSet.AddOrUpdate(item);

				return item;
			}
			// todo: replace with custom
			catch (Exception e)
			{
				throw new Exception($"Unable to update entity. Reason: {e.Message}");
			}
		}

		public async Task RemoveEntityAsync(Guid id)
		{
			try
			{
				var entity = await this.dbSet.SingleOrDefaultAsync(x => x.Id == id);

				if (entity == null)
				{

				}

				this.dbSet.Remove(entity);
			}
			// todo: replace with custom
			catch (Exception ex)
			{
				throw new Exception($"Unable to remove entity. Reason: {ex.Message}");
			}
		}

		public async Task CommitAsync()
		{
			await this.DatabaseContext.SaveChangesAsync();
		}
	}
}
