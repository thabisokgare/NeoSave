using System;

namespace NeoSave.Application.DTOs.Transaction
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public decimal Amount { get; set; } = 0;
        public string Type { get; set; } = string.Empty; // e.g., Income, Expense
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public string Category { get; set; } = string.Empty;
    }
}