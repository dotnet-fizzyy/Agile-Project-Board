using System.Collections.Generic;

namespace WebAPI.Models.Web
{
	public class ProjectBoardPageModel
	{
		public Project Project { get; set; }

		public Team Team { get; set; }

		public IEnumerable<Epic> Epics { get; set; } = new List<Epic>();

		public IEnumerable<Sprint> EpicSprints { get; set; } = new List<Sprint>();
	}
}