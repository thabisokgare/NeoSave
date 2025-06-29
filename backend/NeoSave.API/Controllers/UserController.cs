using Microsoft.AspNetCore.Mvc;
using NeoSave.API.Models;
using Microsoft.EntityFrameworkCore;

using NeoSave.API.Data;
using NeoSave.API.Dto.NeoSave.API.DTOs;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/user/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            if (id <= 0)
                return BadRequest("Invalid user ID.");

            var user = await _context.Users
                                     .Include(u => u.Budgets)
                                     .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound("User not found.");

            // Manual Mapping
            var userDto = new DTOs.UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Budgets = user.Budgets?.Select(b => new BudgetDto
                {
                    Id = b.Id,
                    Name = b.Name,
                    Amount = b.Amount,
                    Category = b.Category
                }).ToList()
            };

            return Ok(userDto);
        }
        // POST: api/user
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] DTOs.UserDto userDto)
        {
            if (userDto == null || string.IsNullOrEmpty(userDto.Name) || string.IsNullOrEmpty(userDto.Email))
                return BadRequest("Invalid user data.");

            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                Password = userDto.Password, // Consider hashing the password before saving
                Budgets = userDto.Budgets?.Select(b => new Budget
                {
                    Name = b.Name,
                    Amount = b.Amount,
                    Category = b.Category,
                    // Add these if present in DTO
                    // StartDate = b.StartDate,
                    // EndDate = b.EndDate,
                    // Description = b.Description,
                    // UserId = user.Id
                }).ToList()
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] DTOs.UserDto userDto)
        {
            if (id <= 0 || userDto == null)
                return BadRequest("Invalid user data.");

            var user = await _context.Users
                                     .Include(u => u.Budgets)
                                     .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return NotFound("User not found.");

            // Update user properties
            user.Name = userDto.Name ?? user.Name;
            user.Email = userDto.Email ?? user.Email;
            if (!string.IsNullOrEmpty(userDto.Password))
                user.Password = userDto.Password;

            // Optionally update budgets if provided
            if (userDto.Budgets != null)
            {
                if (user.Budgets != null)
                {
                    // Remove budgets not in DTO
                    user.Budgets.RemoveAll(b => !userDto.Budgets.Any(dtoB => dtoB.Id == b.Id));

                    // Update or add budgets
                    foreach (var budgetDto in userDto.Budgets)
                    {
                        var existingBudget = user.Budgets.FirstOrDefault(b => b.Id == budgetDto.Id);
                        if (existingBudget != null)
                        {
                            existingBudget.Name = budgetDto.Name;
                            existingBudget.Amount = budgetDto.Amount;
                            existingBudget.Category = budgetDto.Category;
                        }
                        else
                        {
                            user.Budgets.Add(new Budget
                            {
                                Name = budgetDto.Name,
                                Amount = budgetDto.Amount,
                                Category = budgetDto.Category,
                                UserId = user.Id
                            });
                        }
                    }
                }
                else
                {
                    user.Budgets = userDto.Budgets.Select(budgetDto => new Budget
                    {
                        Name = budgetDto.Name,
                        Amount = budgetDto.Amount,
                        Category = budgetDto.Category,
                        UserId = user.Id
                    }).ToList();
                }
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
