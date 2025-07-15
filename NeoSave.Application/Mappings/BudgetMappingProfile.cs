// Location: NeoSave.Application/Mappings/BudgetMappingProfile.cs
using AutoMapper;
using NeoSave.Domain.Entities;
using NeoSave.Application.DTOs.Budget;

public class BudgetMappingProfile : Profile
{
    public BudgetMappingProfile()
    {
        CreateMap<Budget, BudgetDto>();
        CreateMap<CreateBudgetDto, Budget>();
        CreateMap<UpdateBudgetDto, Budget>();
    }
}