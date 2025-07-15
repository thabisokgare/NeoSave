using System.Text;
using System.Security.Claims;
using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NeoSave.Domain.Entities;
using NeoSave.Infrastructure.Data;
using NeoSave.Application.DTOs.Auth;
using NeoSave.Application.Interfaces;

namespace NeoSave.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly NeoSaveDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthService(NeoSaveDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<string?> RegisterAsync(RegisterRequest request)
        {
            // 1. Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (existingUser != null)
                return "A user with this email already exists.";

            // 2. Hash the password
            var passwordHash = HashPassword(request.Password);

            // 3. Create new user entity
            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = passwordHash,
                CreatedAt = DateTime.UtcNow
            };

            // 4. Save the user
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return $"User {user.FullName} registered successfully.";
        }

        public async Task<string?> LoginAsync(LoginRequest request)
        {
            // 1. Find the user by email
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
            if (user == null)
                return null;

            // 2. Verify the password
            var hashedPassword = HashPassword(request.Password);
            if (hashedPassword != user.PasswordHash)
                return null;

            // 3. Generate and return token
            return GenerateToken(user);
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }

        private string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
