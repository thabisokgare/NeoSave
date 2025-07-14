using NeoSave.Infrastructure.Data; // Add this at the top
using NeoSave.Application.Interfaces;
using NeoSave.Application.DTOs.Auth;
using System.Security.Cryptography;
using System.Text;
using NeoSave.Domain.Entities;
using Microsoft.EntityFrameworkCore;
// Add this at the top



namespace NeoSave.Application.Services
{
    public class AuthService : IAuthService
    {
       private readonly NeoSaveDbContext _context;

        public AuthService(NeoSaveDbContext context)
        {
            _context = context;
        }

        public async Task<string> RegisterAsync(RegisterRequest request)
        {
            // 1. Check if user already exists
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (existingUser != null)
                return "A user with this email already exists.";

            // 2. Hash the password
            var passwordHash = HashPassword(request.Password);

            // 3. Create the new user entity
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

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = Encoding.UTF8.GetBytes(password);
            var hash = sha256.ComputeHash(bytes);
            return Convert.ToBase64String(hash);
        }
    }

}
