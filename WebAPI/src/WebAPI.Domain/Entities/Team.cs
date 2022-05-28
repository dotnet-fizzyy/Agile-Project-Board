using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
	public class Team : IBaseEntity
	{
		public Guid Id { get; set; }

		public Guid? ProjectId { get; set; }

		public string Name { get; set; }

		public string Location { get; set; }

		public IList<User> Users { get; set; } = new List<User>();
	}
}
