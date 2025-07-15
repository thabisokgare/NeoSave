using NeoSave.Domain.Enums;

namespace NeoSave.Application.DTOs.Budget
{
    public class BudgetDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public BudgetCategory Category { get; set; } // Much cleaner!
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}