using System;
using System.Web.Http;
using System.Web.Http.Cors;
using Newtonsoft.Json.Serialization;

namespace WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.MediaTypeMappings
	            .Add(new System.Net.Http.Formatting.RequestHeaderMapping("Accept",
		            "text/html",
		            StringComparison.InvariantCultureIgnoreCase,
		            true,
		            "application/json"));

            // Web API routes
            config.MapHttpAttributeRoutes();

#if DEBUG
	        var corsAttribute = new EnableCorsAttribute("*", "*", "*");
	        config.EnableCors(corsAttribute);
#endif
	        config.Routes.MapHttpRoute(name: "", routeTemplate: "{id}.html", defaults: new { id = "index" });

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
