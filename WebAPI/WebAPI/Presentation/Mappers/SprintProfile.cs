using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class SprintProfile : Profile
    {
        public SprintProfile()
        {
            CreateMap<Models.Entities.Sprint, Models.Web.Sprint>();
            CreateMap<Models.Web.Sprint, Models.Entities.Sprint>();
        }
    }
}
