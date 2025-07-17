using AutoMapper;
using NeoSave.Domain.Entities;
using NeoSave.Application.DTOs.Transaction;

namespace NeoSave.Application.Mappings
{
    public class TransactionMappingProfile : Profile
    {
        public TransactionMappingProfile()
        {
            CreateMap<Transaction, TransactionDto>().ReverseMap();
            CreateMap<CreateTransactionDto, Transaction>();
            CreateMap<UpdateTransactionDto, Transaction>();
        }
    }
}