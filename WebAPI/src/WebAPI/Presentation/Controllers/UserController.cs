using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Core.Constants;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;
using WebAPI.Presentation.Filters;

namespace WebAPI.Presentation.Controllers
{
    [RequestBodyFilter]
    [Route("user")]
    public class UserController : ApiController
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        /// <summary>
        /// Get all users (should be removed after development)
        /// </summary>
        [HttpGet]
        [Route("all")]
        public async Task<CollectionResponse<User>> GetUsers() =>
            await this.userService.GetUsersAsync();

        /// <summary>
        /// Get exact user by its id
        /// </summary>
        [HttpGet]
        [Route("{userId:guid}")]
        public async Task<IHttpActionResult> GetUser(Guid userId)
        {
            var user = await this.userService.GetUserAsync(userId);

            if (user == null)
            {
                return this.NotFound();
            }

            return this.Ok(user);
        }

        /// <summary>
        /// Create user
        /// </summary>
        [HttpPost]
        public async Task<IHttpActionResult> CreateUser([FromBody]User user)
        {
            var createdUser = await this.userService.CreateUserAsync(user);

            return this.Created(nameof(UserController), createdUser);
        }

        /// <summary>
        /// Authenticate user with his name and password
        /// </summary>
        [HttpPost]
        [Route("auth")]
        public async Task<IHttpActionResult> AuthenticateUser([FromBody]AuthUser authUser)
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
        public async Task<IHttpActionResult> CreateCustomer([FromBody]AuthUser authUser)
        {
	        var createdCustomer = await this.userService.CreateCustomerAsync(authUser);

	        return this.Created(nameof(UserController), createdCustomer);
        }

        /// <summary>
        /// Update user (without password)
        /// </summary>
        [HttpPut]
        public async Task<IHttpActionResult> UpdateUser([FromBody]User user)
        {
            var updatedUser = await this.userService.UpdateUserAsync(user);

            return this.Ok(updatedUser);
        }

        /// <summary>
        /// Update password for exact user
        /// </summary>
        [HttpPut]
        [Route("password")]
        public async Task<HttpResponseMessage> UpdateUserPassword([FromBody]UserPasswordUpdateModel user)
        {
	        await this.userService.UpdateUserPasswordAsync(user);

	        return new HttpResponseMessage(HttpStatusCode.NoContent);
        }


        /// <summary>
        /// Update user status (active or blocked)
        /// </summary>
        [HttpPut]
        [Route("status")]
        public async Task<HttpResponseMessage> UpdateUserStatus([FromBody]User user)
        {
	        await this.userService.UpdateUserStatusAsync(user);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }

        /// <summary>
        /// Remove user via its id
        /// </summary>
        [HttpDelete]
        [Route("{userId:guid}")]
        public async Task<HttpResponseMessage> RemoveUser(Guid userId)
        {
            await this.userService.RemoveUserAsync(userId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
