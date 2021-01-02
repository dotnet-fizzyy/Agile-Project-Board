using System.Collections.Generic;

namespace WebAPI.Models.Web
{
	public class ProjectBoardModel
	{
		public ProjectBoardModel()
		{
			Epics = new List<Epic>();
			EpicSprints = new List<Sprint>();
		}

		public Project Project { get; set; }

		public Team Team { get; set; }

		public IEnumerable<Epic> Epics { get; set; }

		public IEnumerable<Sprint> EpicSprints { get; set; }
	}
}