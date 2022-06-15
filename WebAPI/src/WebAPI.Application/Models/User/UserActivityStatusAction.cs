using System;

namespace WebAPI.Application.Models.User
{
	public class UserActivityStatusAction
	{
		public Guid UserId { get; set; }

		public bool IsActive { get; set; }
	}
}
