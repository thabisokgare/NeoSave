using System;

namespace NeoSave.Application.DTOs.Transaction
{
    public class CreateTransactionDto
    {
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
    }
}