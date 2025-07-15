using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NeoSave.Domain.Enums;

namespace NeoSave.Domain.Entities
{
    public class Budget
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public BudgetCategory Category { get; set; } // Added this!
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime EndDate { get; set; }
        public DateTime StartDate { get; set; }
        public User? User { get; set; }
    }
}