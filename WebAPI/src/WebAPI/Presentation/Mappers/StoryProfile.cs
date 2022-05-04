using System;
using AutoMapper;
using WebAPI.Core.Enums;

namespace WebAPI.Presentation.Mappers
{
    public class StoryProfile : Profile
    {
        public StoryProfile()
        {
            CreateMap<Models.Entities.Story, Models.Web.Story>()
                .ForMember(x => x.Column, opt => opt.MapFrom(src => src.Columns.ToString()));
            CreateMap<Models.Web.Story, Models.Entities.Story>()
                .ForMember(x => x.Columns, opt => opt.MapFrom(src => (Columns)Enum.Parse(typeof(Columns), src.Column, true)));
        }
    }
}
