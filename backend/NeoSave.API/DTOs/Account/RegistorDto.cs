using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NeoSave.API.DTOs.Account
{
    public class RegistorDto
    {
        [Required]
        public string UserName { get; set; }
        [System.ComponentModel.DataAnnotations.Required]
        public string Password { get; set; }
        [Required]
        public string Email { get; set; }
    }
}