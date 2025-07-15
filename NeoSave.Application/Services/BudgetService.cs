using AutoMapper;
using Microsoft.EntityFrameworkCore;
using NeoSave.Application.DTOs.Budget;
using NeoSave.Application.Interfaces;
using NeoSave.Domain.Entities;
using NeoSave.Domain.Enums;
using NeoSave.Infrastructure.Data;

namespace NeoSave.Application.Services
{
    public class BudgetService : IBudgetService
    {
        private readonly NeoSaveDbContext _context;
        private readonly IMapper _mapper;

        public BudgetService(NeoSaveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BudgetDto>> GetUserBudgetsAsync(Guid userId)
        {
            var budgets = await _context.Budgets
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.CreatedAt)
                .ToListAsync();

            return _mapper.Map<IEnumerable<BudgetDto>>(budgets);
        }

        public async Task<BudgetDto?> GetBudgetAsync(Guid id, Guid userId)
        {
            var budget = await _context.Budgets
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            return budget == null ? null : _mapper.Map<BudgetDto>(budget);
        }

        public async Task<BudgetDto> CreateBudgetAsync(CreateBudgetDto createBudgetDto, Guid userId)
        {
            var budget = _mapper.Map<Budget>(createBudgetDto);
            budget.Id = Guid.NewGuid();
            budget.UserId = userId;
            budget.CreatedAt = DateTime.UtcNow;

            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();

            return _mapper.Map<BudgetDto>(budget);
        }

        public async Task<BudgetDto?> UpdateBudgetAsync(Guid id, UpdateBudgetDto updateBudgetDto, Guid userId)
        {
            var budget = await _context.Budgets
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            if (budget == null)
                return null;

            _mapper.Map(updateBudgetDto, budget);
            await _context.SaveChangesAsync();

            return _mapper.Map<BudgetDto>(budget);
        }

        public async Task<bool> DeleteBudgetAsync(Guid id, Guid userId)
        {
            var budget = await _context.Budgets
                .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

            if (budget == null)
                return false;

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();
            return true;
        }

        public IEnumerable<string> GetBudgetCategories()
        {
            return Enum.GetNames(typeof(BudgetCategory))
                .Select(name => name.ToString())
                .ToList();
        }
    }
}