using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using WebAPI.Core.Constants;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Filters
{
	public class UserVerificationFilterAttribute : FilterAttribute, IAuthorizationFilter
	{
		private const string BadRequestReasonMessage = "Invalid type of user id";

		public override bool AllowMultiple => false;

		public async Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(
			HttpActionContext actionContext, 
			CancellationToken cancellationToken,
			Func<Task<HttpResponseMessage>> continuation
		)
		{
			var userHeaderValues = actionContext.Request.Headers.FirstOrDefault(x => 
				string.Equals(x.Key, Headers.UserHeader, StringComparison.OrdinalIgnoreCase)
			).Value;
			var userHeader = userHeaderValues?.FirstOrDefault();

			if (userHeader == null)
			{
				return ResponseUtilities.GenerateUnauthorizedResponse();
			}

			var isGuid = Guid.TryParse(userHeader, out var validUserId);

			if (!isGuid)
			{
				return ResponseUtilities.GenerateBadRequestResponse(BadRequestReasonMessage);
			}

			return await continuation();
		}
	}
}