using System.Web.Mvc;

namespace WebAPI
{
    public static class FilterConfig
    {
		public static void RegisterGlobalFilters(GlobalFilterCollection filters) => filters.Add(new HandleErrorAttribute());
	}
}
