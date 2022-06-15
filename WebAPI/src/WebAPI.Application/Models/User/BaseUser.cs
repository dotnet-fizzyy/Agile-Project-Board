using System;

namespace WebAPI.Application.Models.User
{
	public abstract class BaseUser
	{
		public Guid UserId { get; set; }

		public Guid? TeamId { get; set; }

		public string UserRole { get; set; }

		public string Username { get; set; }

		public string AvatarLink { get; set; }

		public bool IsActive { get; set; }
	}
}
