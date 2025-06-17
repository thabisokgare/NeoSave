using Microsoft.AspNetCore.Mvc;
using NeoSave.API.Models;
using NeoSave.API.Data;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BudgetController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllBudgets()
        {
            var budgets = _context.Budgets.ToList();
            return Ok(budgets);
        }

        [HttpGet("{id}")]
        public IActionResult GetBudget(int id)
        {
            var budget = _context.Budgets.Find(id);
            if (budget == null)
                return NotFound();
            return Ok(budget);
        }

        [HttpPost]
        public IActionResult CreateBudget(Budget budget)
        {
            _context.Budgets.Add(budget);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetBudget), new { id = budget.Id }, budget);
        }
    }
}

