﻿using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Application.Models.User;
using WebAPI.Application.Services.Queries;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
	[RequestBodyFilter]
	[RoutePrefix("auth")]
	public class AuthController : ApiController
	{
		private readonly IUserQueriesUseCase userQueries;

		public AuthController(IUserQueriesUseCase userQueries)
		{
			this.userQueries = userQueries;
		}

		/// <summary>
		/// Authenticate user with name and password
		/// </summary>
		[HttpPost]
		public async Task<IHttpActionResult> AuthenticateUser([FromBody] AuthUser authUser)
		{
			var authenticatedUser = await this.userQueries.AuthenticateUser(authUser);

			if (authenticatedUser == null)
			{
				return this.BadRequest();
			}

			return this.Ok(authenticatedUser);
		}
	}
}