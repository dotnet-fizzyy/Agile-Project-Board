using System;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using WebAPI.Presentation.Utilities;

namespace WebAPI.Presentation.Filters
{
	public class RequestBodyFilterAttribute : FilterAttribute, IActionFilter
	{
		private const string BadRequestReasonMessage = "The request body required";

		public override bool AllowMultiple => false;

		public async Task<HttpResponseMessage> ExecuteActionFilterAsync(
			HttpActionContext actionContext, 
			CancellationToken cancellationToken, 
			Func<Task<HttpResponseMessage>> continuation
		)
		{
			var httpMethod = actionContext.Request.Method;
			var requestBody = actionContext.ActionArguments.Values.FirstOrDefault();

			var isRequestBodyMissing = requestBody == null;
			var isHttpMethodPostOrPut = httpMethod == HttpMethod.Post || httpMethod == HttpMethod.Put;

			if (isRequestBodyMissing && isHttpMethodPostOrPut)
			{
				return ResponseUtilities.GenerateBadRequestResponse(BadRequestReasonMessage);
			}

			return await continuation();
		}
	}
}