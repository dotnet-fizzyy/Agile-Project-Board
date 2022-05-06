using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
    public class SprintProfile : Profile
    {
        public SprintProfile()
        {
            this.CreateMap<Models.Entities.Sprint, Models.Web.Sprint>();
            this.CreateMap<Models.Web.Sprint, Models.Entities.Sprint>();
        }
    }
}
