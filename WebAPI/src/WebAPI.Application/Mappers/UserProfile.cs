using AutoMapper;
using WebAPI.Application.Models.User;

namespace WebAPI.Application.Mappers
{
	internal class UserProfile : Profile
	{
		public UserProfile()
		{
			this.CreateMap<Domain.Entities.User, UserResult>();
		}
	}
}
