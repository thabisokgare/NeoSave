using System;

namespace NeoSave.Domain.Entities
{
    public class Transaction
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public decimal Amount { get; set; } = 0;
        public string Type { get; set; } = string.Empty; // e.g., Income, Expense
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public string Category { get; set; } = string.Empty;
    }
}