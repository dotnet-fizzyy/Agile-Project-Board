﻿using System;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Threading.Tasks;
using WebAPI.Application.Repositories.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Infrastructure.Database.Repositories.Common
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

		public async Task<T> CreateEntityAsync(T entity, bool commitImmediatly)
		{
			try
			{
				this.dbSet.Add(entity);

				if (commitImmediatly)
				{
					await this.CommitAsync();

					this.DatabaseContext.Entry(entity).State = EntityState.Detached;
				}

				return entity;
			}
			// todo: replace with custom
			catch (Exception ex)
			{
				throw new Exception($"Unable to add entity. Reason: {ex.Message}");
			}
		}

		public async Task<T> UpdateEntityAsync(T item, bool commitImmediatly)
		{
			try
			{
				this.dbSet.AddOrUpdate(item);

				if (commitImmediatly)
				{
					await this.CommitAsync();

					this.DatabaseContext.Entry(item).State = EntityState.Detached;
				}

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