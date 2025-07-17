using System;
using System.ComponentModel.DataAnnotations;

namespace NeoSave.Application.DTOs.Transaction
{
    public class UpdateTransactionDto
    {
        public decimal? Amount { get; set; }
        [Required]
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime? Date { get; set; } = DateTime.Now;
        public string Category { get; set; } = string.Empty;
    }
}