using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            CreateMap<Models.Entities.Project, Models.Web.Project>();
            CreateMap<Models.Web.Project, Models.Entities.Project>();
        }
    }
}
