using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeoSave.Application.DTOs.Budget;
using NeoSave.Application.Interfaces;
using System.Security.Claims;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Requires authentication for all endpoints
    public class BudgetController : ControllerBase
    {
        private readonly IBudgetService _budgetService;

        public BudgetController(IBudgetService budgetService)
        {
            _budgetService = budgetService;
        }

        // GET: api/budget
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BudgetDto>>> GetUserBudgets()
        {
            var userId = GetCurrentUserId();
            var budgets = await _budgetService.GetUserBudgetsAsync(userId);
            return Ok(budgets);
        }

        // GET: api/budget/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<BudgetDto>> GetBudget(Guid id)
        {
            var userId = GetCurrentUserId();
            var budget = await _budgetService.GetBudgetAsync(id, userId);

            if (budget == null)
            {
                return NotFound($"Budget with ID {id} not found");
            }

            return Ok(budget);
        }

        // POST: api/budget
        [HttpPost]
        public async Task<ActionResult<BudgetDto>> CreateBudget(CreateBudgetDto createBudgetDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();
            var createdBudget = await _budgetService.CreateBudgetAsync(createBudgetDto, userId);

            return CreatedAtAction(
                nameof(GetBudget),
                new { id = createdBudget.Id },
                createdBudget);
        }

        // PUT: api/budget/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult<BudgetDto>> UpdateBudget(Guid id, UpdateBudgetDto updateBudgetDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();
            var updatedBudget = await _budgetService.UpdateBudgetAsync(id, updateBudgetDto, userId);

            if (updatedBudget == null)
            {
                return NotFound($"Budget with ID {id} not found");
            }

            return Ok(updatedBudget);
        }

        // DELETE: api/budget/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBudget(Guid id)
        {
            var userId = GetCurrentUserId();
            var success = await _budgetService.DeleteBudgetAsync(id, userId);

            if (!success)
            {
                return NotFound($"Budget with ID {id} not found");
            }

            return NoContent();
        }

        // GET: api/budget/categories
        [HttpGet("categories")]
        public ActionResult<IEnumerable<string>> GetBudgetCategories()
        {
            var categories = _budgetService.GetBudgetCategories();
            return Ok(categories);
        }

        // Helper method to get current user ID from JWT token
        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst("sub")?.Value
                ?? User.FindFirst("nameid")?.Value;

            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
            {
                throw new UnauthorizedAccessException("Invalid user token");
            }
            return userId;
        }
    }
}