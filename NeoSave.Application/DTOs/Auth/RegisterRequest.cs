using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.Application.DTOs.Auth
{
    public class RegisterRequest
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}