using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NeoSave.Application.DTOs.Auth;
using NeoSave.Domain.Entities;
using NeoSave.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);
            return Ok(new { message = result });
        }

        [Authorize]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var token = await _authService.LoginAsync(request);

            if (token == null)
                return Unauthorized(new { message = "Invalid email or password." });

            return Ok(new { token });
        }


    }
}