using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace NeoSave.API.Models
{
    public class AppUser : IdentityUser
    {
        public new string Id { get; set; }
        public string? Name { get; set; } = string.Empty;
        public new string Email { get; set; }
        public string? Password { get; set; }

        public List<Budget>? Budgets { get; set; } = new List<Budget>();
    }
    
}