using System.Collections.Generic;

namespace WebAPI.Models.Web
{
	public class FullProjectDescription
	{
		public FullProjectDescription()
		{
			Epics = new List<Epic>();
		}

		public Project Project { get; set; }

		public IEnumerable<Epic> Epics { get; set; }
	}
}