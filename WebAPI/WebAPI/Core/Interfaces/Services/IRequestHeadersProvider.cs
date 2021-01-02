using System;
using System.Net.Http;

namespace WebAPI.Core.Interfaces.Services
{
	public interface IRequestHeadersProvider
	{
		Guid GetUserId(HttpRequestMessage httpRequest);
	}
}
