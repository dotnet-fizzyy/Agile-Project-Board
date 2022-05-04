using System;
using System.Linq;
using System.Net.Http;
using WebAPI.Core.Constants;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.ApplicationLogic
{
	public class RequestHeadersProvider : IRequestHeadersProvider
	{
		public Guid GetUserId(HttpRequestMessage httpRequest) => Guid.Parse(httpRequest.Headers.GetValues(Headers.UserHeader).First());
	}
}