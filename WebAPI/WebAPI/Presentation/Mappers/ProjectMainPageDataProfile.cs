using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
	public class ProjectMainPageDataProfile : Profile
	{
		public ProjectMainPageDataProfile()
		{
			CreateMap<Models.Entities.ProjectMainPageData, Models.Web.ProjectMainPageModel>();
			CreateMap<Models.Web.ProjectMainPageModel, Models.Entities.ProjectMainPageData>();
		}
	}
}