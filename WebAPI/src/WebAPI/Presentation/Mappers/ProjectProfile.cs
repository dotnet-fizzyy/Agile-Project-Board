using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class ProjectProfile : Profile
    {
        public ProjectProfile()
        {
            this.CreateMap<Models.Entities.Project, Models.Web.Project>();
            this.CreateMap<Models.Web.Project, Models.Entities.Project>();
        }
    }
}
