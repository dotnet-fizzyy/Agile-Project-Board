using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.Filters;
using WebAPI.DomainAPI.Exceptions;

namespace WebAPI.Presentation.Filters
{
	public class ExceptionFilterAttribute : FilterAttribute, IExceptionFilter
	{
		public Task ExecuteExceptionFilterAsync(HttpActionExecutedContext actionExecutedContext, CancellationToken cancellationToken)
		{
			var appException = actionExecutedContext.Exception;

			if (appException == null)
			{
				return Task.CompletedTask;
			}

			switch (appException)
			{
				case NotFoundException notFoundException:
					ProcessNotFoundResponse(actionExecutedContext.Response, notFoundException.Message);

					break;
				case InternalServerException internalServerException:
					ProcessInternalErrorResponse(actionExecutedContext.Response, internalServerException.Message);

					break;
				default:
					ProcessInternalErrorResponse(actionExecutedContext.Response, "Some internal error occured");

					break;
			}

			return Task.CompletedTask;
		}

		private static void ProcessNotFoundResponse(HttpResponseMessage response, string message)
		{
			response.StatusCode = HttpStatusCode.NotFound;
			response.Content = new StringContent(message);
		}

		private static void ProcessInternalErrorResponse(HttpResponseMessage response, string message)
		{
			response.StatusCode = HttpStatusCode.InternalServerError;
			response.Content = new StringContent(message);
		}
	}
}