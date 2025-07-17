using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeoSave.Application.DTOs.Goal;
using NeoSave.Application.Interfaces;
using System.Security.Claims;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class GoalController : ControllerBase
    {
        private readonly IGoalService _goalService;

        public GoalController(IGoalService goalService)
        {
            _goalService = goalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<GoalDto>>> GetUserGoals()
        {
            var userId = GetCurrentUserId();
            var goals = await _goalService.GetUserGoalsAsync(userId);
            return Ok(goals);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GoalDto>> GetGoal(Guid id)
        {
            var userId = GetCurrentUserId();
            var goal = await _goalService.GetGoalAsync(id, userId);
            if (goal == null)
                return NotFound($"Goal with ID {id} not found");
            return Ok(goal);
        }

        [HttpPost]
        public async Task<ActionResult<GoalDto>> CreateGoal(CreateGoalDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var userId = GetCurrentUserId();
            var createdGoal = await _goalService.CreateGoalAsync(dto, userId);
            return CreatedAtAction(nameof(GetGoal), new { id = createdGoal.Id }, createdGoal);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<GoalDto>> UpdateGoal(Guid id, UpdateGoalDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var userId = GetCurrentUserId();
            var updatedGoal = await _goalService.UpdateGoalAsync(id, dto, userId);
            if (updatedGoal == null)
                return NotFound($"Goal with ID {id} not found");
            return Ok(updatedGoal);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGoal(Guid id)
        {
            var userId = GetCurrentUserId();
            var success = await _goalService.DeleteGoalAsync(id, userId);
            if (!success)
                return NotFound($"Goal with ID {id} not found");
            return NoContent();
        }

        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? User.FindFirst("sub")?.Value
                ?? User.FindFirst("nameid")?.Value;
            if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out var userId))
                throw new UnauthorizedAccessException("Invalid user token");
            return userId;
        }
    }
}