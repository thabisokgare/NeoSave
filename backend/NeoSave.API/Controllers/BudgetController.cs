using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NeoSave.API.Models;
using NeoSave.API.Data;
using Microsoft.EntityFrameworkCore;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BudgetController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BudgetController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Budget>>> GetBudgets()
        {
            return Ok(await _context.Budgets.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Budget>> GetBudget(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
                return NotFound();
            return Ok(budget);
        }

        [HttpPost]
        public async Task<ActionResult<Budget>> CreateBudget([FromBody] Budget budget)
        {
            _context.Budgets.Add(budget);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBudget), new { id = budget.Id }, budget);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBudget(int id, [FromBody] Budget updatedBudget)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
                return NotFound();

            budget.Name = updatedBudget.Name;
            budget.Amount = updatedBudget.Amount;
            budget.StartDate = updatedBudget.StartDate;
            budget.EndDate = updatedBudget.EndDate;
            budget.Category = updatedBudget.Category;
            budget.Description = updatedBudget.Description;
            budget.UserId = updatedBudget.UserId;

            _context.Budgets.Update(budget);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBudget(int id)
        {
            var budget = await _context.Budgets.FindAsync(id);
            if (budget == null)
                return NotFound();

            _context.Budgets.Remove(budget);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}