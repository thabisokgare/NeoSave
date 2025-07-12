using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; }   = string.Empty;
        public string PasswordHash { get; set; }= string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}