using AutoMapper;
using WebAPI.Application.Services.User.Queries.Common;
using WebAPI.Domain.Entities;

namespace WebAPI.Configuration.Mappers
{
	public class UserProfile : Profile
	{
		public UserProfile()
		{
			this.CreateMap<User, UserResult>();
		}
	}
}
