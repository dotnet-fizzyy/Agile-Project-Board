using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace WebAPI.Presentation.Filters
{
	public class RequestBodyFilter : FilterAttribute, IActionFilter
	{
		private const string BadRequestReasonMessage = "The request body required";

		public async Task<HttpResponseMessage> ExecuteActionFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
		{
			var httpMethod = actionContext.Request.Method;
			var requestBody = actionContext.ActionArguments.Values.FirstOrDefault();

			if ((httpMethod == HttpMethod.Post || httpMethod == HttpMethod.Put) && requestBody == null)
			{
				var response = new HttpResponseMessage
				{
					StatusCode = HttpStatusCode.BadRequest,
					Content = new StringContent(BadRequestReasonMessage),
				};


				return response;
			}

			return await continuation();
		}
	}
}