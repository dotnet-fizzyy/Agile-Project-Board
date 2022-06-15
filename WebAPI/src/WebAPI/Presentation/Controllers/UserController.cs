using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Application.Models.User;
using WebAPI.Application.Services.User.Commands;
using WebAPI.Application.Services.User.Queries;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Domain.Helpers;
using WebAPI.Models.Web;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [RequestBodyFilter]
    [RoutePrefix("user")]
    public class UserController : ApiController
    {
        private readonly IUserService userService;
        private readonly IUserQueriesUseCase userQueries;
        private readonly IUserCommandsUseCase userCommands;

        public UserController(
            IUserService userService,
            IUserCommandsUseCase userCommands,
            IUserQueriesUseCase userQueries
        )
        {
            this.userService = userService;
            this.userCommands = userCommands;
            this.userQueries = userQueries;
        }

        /// <summary>
        /// Get users via pagination parameters
        /// </summary>
        [HttpGet]
        [Route("all")]
        public async Task<CollectionResult<UserResult>> GetUsers(
            [FromUri] int limit,
            [FromUri] int offset
        ) =>
            await this.userQueries.GetUsersAsync(limit, offset);

        /// <summary>
        /// Get exact user by its id
        /// </summary>
        [HttpGet]
        [Route("{userId:guid}")]
        public async Task<IHttpActionResult> GetUser(Guid userId)
        {
            var user = await this.userQueries.GetUserByIdAsync(userId);

            return this.Ok(user);
        }

        /// <summary>
        /// Authenticate user with his name and password
        /// </summary>
        [HttpPost]
        [Route("auth")]
        public async Task<IHttpActionResult> AuthenticateUser([FromBody] AuthUser authUser)
        {
	        var authenticatedUser = await this.userService.AuthenticateUser(authUser);

	        if (authenticatedUser == null)
	        {
		        return this.BadRequest();
	        }

	        return this.Ok(authenticatedUser);
        }

        /// <summary>
        /// Create customer on registration
        /// </summary>
        [HttpPost]
        [Route("customer")]
        public async Task<IHttpActionResult> CreateCustomer([FromBody] AuthUser authUser)
        {
	        var createdCustomer = await this.userService.CreateCustomerAsync(authUser);

	        return this.Created(nameof(UserController), createdCustomer);
        }

        /// <summary>
        /// Create user
        /// </summary>
        [HttpPost]
        public async Task<IHttpActionResult> Create([FromBody] UserAction user)
        {
            var createdUser = await this.userCommands.CreateUserAsync(user);

            return this.Created(nameof(UserController), createdUser);
        }

        /// <summary>
        /// Update user (without password)
        /// </summary>
        [HttpPut]
        public async Task<IHttpActionResult> Update([FromBody] UserAction user)
        {
            var updatedUser = await this.userCommands.UpdateAsync(user);

            return this.Ok(updatedUser);
        }

        /// <summary>
        /// Update password for user
        /// </summary>
        [HttpPut]
        [Route("password")]
        public async Task<HttpResponseMessage> UpdateUserPassword([FromBody] UserPasswordAction user)
        {
	        await this.userCommands.UpdatePasswordAsync(user);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Update user availability status
        /// </summary>
        [HttpPut]
        [Route("status")]
        public async Task<HttpResponseMessage> UpdateActivityStatus([FromBody] UserActivityStatusAction userActivityStatus)
        {
            await this.userCommands.UpdateActivityStatusAsync(userActivityStatus);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Remove user by id
        /// </summary>
        [HttpDelete]
        [Route("{userId:guid}")]
        public async Task<HttpResponseMessage> Remove(Guid userId)
        {
            await this.userCommands.RemoveByIdAsync(userId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
