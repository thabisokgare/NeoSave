using AutoMapper;
using NeoSave.Domain.Entities;
using NeoSave.Application.DTOs.Goal;

namespace NeoSave.Application.Mappings
{
    public class GoalMappingProfile : Profile
    {
        public GoalMappingProfile()
        {
            CreateMap<Goal, GoalDto>().ReverseMap();
            CreateMap<CreateGoalDto, Goal>();
            CreateMap<UpdateGoalDto, Goal>();
        }
    }
} 