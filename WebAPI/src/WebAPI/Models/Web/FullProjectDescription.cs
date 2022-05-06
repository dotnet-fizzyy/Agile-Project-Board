using System.Collections.Generic;

namespace WebAPI.Models.Web
{
	public class FullProjectDescription
	{
		public Project Project { get; set; }

		public IEnumerable<Epic> Epics { get; set; } = new List<Epic>();
	}
}