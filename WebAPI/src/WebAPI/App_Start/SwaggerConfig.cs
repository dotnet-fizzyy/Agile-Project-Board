using System.IO;
using System.Reflection;
using System;
using System.Web.Http;
using Swashbuckle.Application;
using WebActivatorEx;
using WebAPI;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace WebAPI
{
    public static class SwaggerConfig
    {
		[System.Diagnostics.CodeAnalysis.SuppressMessage("Minor Code Smell", "S1481:Unused local variables should be removed", Justification = "<Pending>")]
		public static void Register()
        {
            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                {
                    c.SingleApiVersion("v1", "WebAPI");

                    var xmlDocumentName = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var executingDirectory = AppContext.BaseDirectory + "bin";
                    var xmlDocumentPath = Path.Combine(executingDirectory, xmlDocumentName);

                    c.IncludeXmlComments(xmlDocumentPath);
                })
                .EnableSwaggerUi(c =>
                {
                    c.DocumentTitle("WebAPI Swagger UI");
                });
        }
    }
}
