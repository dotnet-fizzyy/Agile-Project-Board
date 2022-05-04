using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class EpicProfile : Profile
    {
        public EpicProfile()
        {
            CreateMap<Models.Entities.Epic, Models.Web.Epic>();
            CreateMap<Models.Web.Epic, Models.Entities.Epic>();
        }
    }
}
