using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Investment;

namespace NeoSave.Application.Interfaces
{
    public interface IInvestmentService
    {
        Task<IEnumerable<InvestmentDto>> GetUserInvestmentsAsync(Guid userId);
        Task<InvestmentDto> GetInvestmentAsync(Guid id, Guid userId);
        Task<InvestmentDto> CreateInvestmentAsync(CreateInvestmentDto dto, Guid userId);
        Task<InvestmentDto> UpdateInvestmentAsync(Guid id, UpdateInvestmentDto dto, Guid userId);
        Task<bool> DeleteInvestmentAsync(Guid id, Guid userId);
    }
}