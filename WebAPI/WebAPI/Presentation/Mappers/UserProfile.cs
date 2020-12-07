using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
  public class UserProfile : Profile
  {
    public UserProfile()
    {
      CreateMap<Models.Entities.User, Models.Web.User>();
      CreateMap<Models.Web.User, Models.Entities.User>();
    }
  }
}
