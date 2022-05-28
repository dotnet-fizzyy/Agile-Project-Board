using System;

namespace WebAPI.Domain.Entities
{
	public interface IBaseEntity
	{
		Guid Id { get; set; }
	}
}
