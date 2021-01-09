using System;

namespace WebAPI.Models.Web
{
	public class UpdateStoryColumnModel
	{
		public Guid StoryId { get; set; }

		public string Column { get; set; }
	}
}