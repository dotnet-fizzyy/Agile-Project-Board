using System.Net;
using System.Net.Http;

namespace WebAPI.Presentation.Utilities
{
	public static class ResponseUtilities
	{
		public static HttpResponseMessage GenerateUnauthorizedResponse() =>
			new HttpResponseMessage
			{
				StatusCode = HttpStatusCode.Unauthorized,
			};

		public static HttpResponseMessage GenerateBadRequestResponse(string message) =>
			new HttpResponseMessage
			{
				StatusCode = HttpStatusCode.BadRequest,
				Content = new StringContent(message),
			};
	}
}