using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
	public class ProjectMainPageDataProfile : Profile
	{
		public ProjectMainPageDataProfile()
		{
			this.CreateMap<Models.Entities.ProjectMainPageData, Models.Web.ProjectMainPageModel>();
			this.CreateMap<Models.Web.ProjectMainPageModel, Models.Entities.ProjectMainPageData>();
		}
	}
}