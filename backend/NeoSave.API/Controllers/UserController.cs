using Microsoft.AspNetCore.Mvc;
using NeoSave.API.Models;
using NeoSave.API.Data;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpPost]
        public IActionResult CreateUser(User user)
        {
            user.CreatedAt = DateTime.UtcNow;
            _context.Users.Add(user);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            if (id != user.Id)
                return BadRequest();

            var existingUser = _context.Users.Find(id);
            if (existingUser == null)
                return NotFound();

            existingUser.Username = user.Username;
            existingUser.Email = user.Email;
            
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                return NotFound();

            _context.Users.Remove(user);
            _context.SaveChanges();
            return NoContent();
        }
    }
}