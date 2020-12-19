using System;
using AutoMapper;
using WebAPI.Core.Enums;

namespace WebAPI.Presentation.Mappers
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			CreateMap<Models.Entities.User, Models.Web.User>()
				.ForMember(x => x.UserRole, opt => opt.MapFrom(src => src.UserRole.ToString()));
			CreateMap<Models.Web.User, Models.Entities.User>()
				.ForMember(x => x.UserRole, opt => opt.MapFrom(src => (UserRole)Enum.Parse(typeof(UserRole), src.UserRole)));

			CreateMap<Models.Web.AuthUser, Models.Entities.User>()
				.ForMember(x => x.IsActive, src => src.MapFrom(opt => true));
		}
	}
}
