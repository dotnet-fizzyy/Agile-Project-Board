using System;

namespace WebAPI.Application.Models.User
{
	public class UserPasswordAction
	{
		public Guid UserId { get; set; }

		public string Password { get; set; }
	}
}
