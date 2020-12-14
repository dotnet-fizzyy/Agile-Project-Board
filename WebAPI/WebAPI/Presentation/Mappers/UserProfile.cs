using AutoMapper;

namespace WebAPI.Presentation.Mappers
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<Models.Entities.User, Models.Web.User>();
			CreateMap<Models.Web.User, Models.Entities.User>();

			CreateMap<Models.Web.AuthUser, Models.Entities.User>()
				.ForMember(x => x.IsActive, src => src.MapFrom(opt => true));
		}
	}
}
