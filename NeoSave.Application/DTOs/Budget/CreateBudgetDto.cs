using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.Application.DTOs.Budget
{
    public class CreateBudgetDto
    {
        [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    }
}