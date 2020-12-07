using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WebAPI.Core.Constants;
using WebAPI.Core.Interfaces.Services;
using WebAPI.Models.Result;
using WebAPI.Models.Web;

namespace WebAPI.Presentation.Controllers
{
    public class UserController : ApiController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Route(RouteConstants.UserControllerGetAllUsersUrl)]
        public async Task<CollectionResponse<User>> GetUsers()
        {
            return await _userService.GetUsersAsync();
        }

        [HttpGet]
        [Route(RouteConstants.UserControllerGetUserUrl)]
        public async Task<IHttpActionResult> GetUser(Guid userId)
        {
            var user = await _userService.GetUserAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [Route(RouteConstants.UserControllerUrl)]
        public async Task<IHttpActionResult> CreateUser([FromBody]User user)
        {
            var createdUser = await _userService.CreateUserAsync(user);

            return Created(nameof(UserController), createdUser);
        }

        [HttpPut]
        [Route(RouteConstants.UserControllerUrl)]
        public async Task<IHttpActionResult> UpdateUser([FromBody] User user)
        {
            var updatedUser = await _userService.UpdateUserAsync(user);

            return Ok(updatedUser);
        }

        [HttpDelete]
        [Route(RouteConstants.UserControllerGetUserUrl)]
        public async Task<HttpResponseMessage> RemoveUser(Guid userId)
        {
            await _userService.RemoveUserAsync(userId);

            return new HttpResponseMessage(HttpStatusCode.NoContent);
        }
    }
}
