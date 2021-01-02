using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using WebAPI.Core.Constants;

namespace WebAPI.Presentation.Filters
{
	public class UserVerificationFilter : FilterAttribute, IAuthorizationFilter
	{
		private const string BadRequestReasonMessage = "Invalid type of user id";

		public override bool AllowMultiple => false;

		public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken,
			Func<Task<HttpResponseMessage>> continuation)
		{
			var userHeaderValues = actionContext.Request.Headers.FirstOrDefault(x => string.Equals(x.Key, Headers.UserHeader, StringComparison.OrdinalIgnoreCase)).Value;
			var userHeader = userHeaderValues?.FirstOrDefault();

			if (userHeader == null)
			{
				var httpResponseMessage = new HttpResponseMessage
				{
					StatusCode = HttpStatusCode.Unauthorized,
				};

				return httpResponseMessage;
			}

			var isGuid = Guid.TryParse(userHeader, out var validUserId);

			if (!isGuid)
			{
				var httpResponseMessage = new HttpResponseMessage
				{
					StatusCode = HttpStatusCode.BadRequest,
					Content = new StringContent(BadRequestReasonMessage),
				};

				return httpResponseMessage;
			}

			return await continuation();
		}
	}
}