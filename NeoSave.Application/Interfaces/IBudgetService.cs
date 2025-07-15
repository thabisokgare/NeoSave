using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Budget;
using NeoSave.Domain.Entities;

namespace NeoSave.Application.Interfaces
{
    public interface IBudgetService
    {
        Task<IEnumerable<BudgetDto>> GetUserBudgetsAsync(Guid userId);
    Task<BudgetDto?> GetBudgetAsync(Guid id, Guid userId);
    Task<BudgetDto> CreateBudgetAsync(CreateBudgetDto createBudgetDto, Guid userId);
    Task<BudgetDto?> UpdateBudgetAsync(Guid id, UpdateBudgetDto updateBudgetDto, Guid userId);
    Task<bool> DeleteBudgetAsync(Guid id, Guid userId);
    IEnumerable<string> GetBudgetCategories();
    }
}