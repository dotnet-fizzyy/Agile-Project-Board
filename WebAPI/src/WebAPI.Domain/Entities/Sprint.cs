using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
	public class Sprint : IBaseEntity
	{
		public Guid Id { get; set; }

		public Guid EpicId { get; set; }

		public string SprintName { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }

		public IList<Story> Stories { get; set; } = new List<Story>();
	}
}
