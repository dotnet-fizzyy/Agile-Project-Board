using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class TeamProfile : Profile
    {
        public TeamProfile()
        {
            CreateMap<Models.Entities.Team, Models.Web.Team>();
            CreateMap<Models.Web.Team, Models.Entities.Team>();
        }
    }
}
