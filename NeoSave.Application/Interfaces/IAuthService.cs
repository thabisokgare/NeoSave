using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Auth;

namespace NeoSave.Application.Interfaces
{
    public interface IAuthService
    {
        Task<string> RegisterAsync(RegisterRequest request);
    }
}