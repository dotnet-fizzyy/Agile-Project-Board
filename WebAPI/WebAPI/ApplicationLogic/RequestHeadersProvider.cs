using System;
using System.Linq;
using System.Net.Http;
using WebAPI.Core.Constants;
using WebAPI.Core.Interfaces.Services;

namespace WebAPI.ApplicationLogic
{
	public class RequestHeadersProvider : IRequestHeadersProvider
	{
		public Guid? GetUserId(HttpRequestMessage httpRequest)
		{
			var userId = httpRequest.Headers.GetValues(Headers.UserHeader).FirstOrDefault();

			if (string.Equals(userId, string.Empty) || !Guid.TryParse(userId, out var parsedResult))
			{
				return null;
			}

			return parsedResult;
		}
	}
}