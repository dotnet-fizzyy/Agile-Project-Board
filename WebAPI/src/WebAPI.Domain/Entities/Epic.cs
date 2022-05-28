using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
	public class Epic : IBaseEntity
	{
		public Guid Id { get; set; }

		public Guid ProjectId { get; set; }

		public string EpicName { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }

		public IList<Sprint> Sprints { get; set; } = new List<Sprint>();
	}
}
