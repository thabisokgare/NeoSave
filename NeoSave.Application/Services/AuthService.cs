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
using System.ComponentModel.DataAnnotations;

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
            var email = request.Email.Trim().ToLowerInvariant();

            if (await _context.Users.AnyAsync(u => u.Email.ToLower() == email))
                return "A user with this email already exists.";

            var salt = GenerateSalt();
            var hash = HashPasswordBytes(request.Password, salt);

            var user = new User
            {
                Id = Guid.NewGuid(),
                FullName = request.FullName,
                Email = email,
                PasswordHash = $"{Convert.ToBase64String(salt)}.{Convert.ToBase64String(hash)}",
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return $"User {user.FullName} registered successfully.";
        }

        public async Task<string?> LoginAsync(LoginRequest request)
        {
            var email = request.Email.Trim().ToLowerInvariant();
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email.ToLower() == email);
            if (user == null) return null;

            if (!VerifyPassword(request.Password, user.PasswordHash))
                return null;

            return GenerateToken(user);
        }

        // helpers
        private static byte[] GenerateSalt(int size = 16)
        {
            var salt = new byte[size];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(salt);
            return salt;
        }

        private static byte[] HashPasswordBytes(string password, byte[] salt, int iterations = 100_000, int length = 32)
        {
            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, iterations, HashAlgorithmName.SHA256);
            return pbkdf2.GetBytes(length);
        }

        private static bool VerifyPassword(string password, string stored)
        {
            if (string.IsNullOrEmpty(stored)) return false;
            var parts = stored.Split('.', 2);
            if (parts.Length != 2) return false;

            var salt = Convert.FromBase64String(parts[0]);
            var expected = Convert.FromBase64String(parts[1]);
            var actual = HashPasswordBytes(password, salt);
            return CryptographicOperations.FixedTimeEquals(actual, expected);
        }

        private string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FullName),
                new Claim(ClaimTypes.Email, user.Email),

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
