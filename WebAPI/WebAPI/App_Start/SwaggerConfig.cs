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
    public class SwaggerConfig
    {
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
