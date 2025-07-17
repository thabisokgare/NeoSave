using System;

namespace NeoSave.Application.DTOs.Investment
{
    public class UpdateInvestmentDto
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public decimal? Amount { get; set; }
        public string Description { get; set; }
    }
}