using AutoMapper;
using NeoSave.Domain.Entities;
using NeoSave.Application.DTOs.Investment;

namespace NeoSave.Application.Mappings
{
    public class InvestmentMappingProfile : Profile
    {
        public InvestmentMappingProfile()
        {
            CreateMap<Investment, InvestmentDto>().ReverseMap();
            CreateMap<CreateInvestmentDto, Investment>();
            CreateMap<UpdateInvestmentDto, Investment>();
        }
    }
}