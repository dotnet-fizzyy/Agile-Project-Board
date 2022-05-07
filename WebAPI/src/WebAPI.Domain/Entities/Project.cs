using System;
using System.Collections.Generic;

namespace WebAPI.Domain.Entities
{
	public class Project
	{
		public Guid ProjectId { get; set; }

		public string ProjectName { get; set; }

		public DateTime StartDate { get; set; }

		public DateTime EndDate { get; set; }

		public Guid CustomerId { get; set; }

		public IList<Team> Teams { get; set; } = new List<Team>();

		public IList<Epic> Epics { get; set; } = new List<Epic>();
	}
}
