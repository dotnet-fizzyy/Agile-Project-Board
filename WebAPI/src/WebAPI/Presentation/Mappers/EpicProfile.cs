using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class EpicProfile : Profile
    {
        public EpicProfile()
        {
            this.CreateMap<Models.Entities.Epic, Models.Web.Epic>();
            this.CreateMap<Models.Web.Epic, Models.Entities.Epic>();
        }
    }
}
