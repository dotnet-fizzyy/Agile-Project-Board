using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class TeamProfile : Profile
    {
        public TeamProfile()
        {
            this.CreateMap<Models.Entities.Team, Models.Web.Team>();
            this.CreateMap<Models.Web.Team, Models.Entities.Team>();
        }
    }
}
