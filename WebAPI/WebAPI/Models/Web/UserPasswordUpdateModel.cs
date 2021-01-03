using System;

namespace WebAPI.Models.Web
{
	public class UserPasswordUpdateModel
	{
		public Guid UserId { get; set; }

		public string Password { get; set; }
	}
}