using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.API.Models
{
    public class User
    {

        public int Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        public string? Password { get; set; }
        
        public List<Budget>? Budgets { get; set; } = new List<Budget>();
        
    }
}