using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.API.Models
{
    public class Budget
    {
        public int Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Category { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public int? UserId { get; set; } // Foreign key to User
        // Navigation property
        public User? User { get; set; }
    }
}