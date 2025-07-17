using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeoSave.Application.DTOs.Investment;
using NeoSave.Application.Interfaces;
using System.Security.Claims;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InvestmentController : ControllerBase
    {
        private readonly IInvestmentService _investmentService;

        public InvestmentController(IInvestmentService investmentService)
        {
            _investmentService = investmentService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InvestmentDto>>> GetUserInvestments()
        {
            var userId = GetCurrentUserId();
            var investments = await _investmentService.GetUserInvestmentsAsync(userId);
            return Ok(investments);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<InvestmentDto>> GetInvestment(Guid id)
        {
            var userId = GetCurrentUserId();
            var investment = await _investmentService.GetInvestmentAsync(id, userId);
            if (investment == null)
                return NotFound($"Investment with ID {id} not found");
            return Ok(investment);
        }

        [HttpPost]
        public async Task<ActionResult<InvestmentDto>> CreateInvestment(CreateInvestmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var userId = GetCurrentUserId();
            var createdInvestment = await _investmentService.CreateInvestmentAsync(dto, userId);
            return CreatedAtAction(nameof(GetInvestment), new { id = createdInvestment.Id }, createdInvestment);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<InvestmentDto>> UpdateInvestment(Guid id, UpdateInvestmentDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var userId = GetCurrentUserId();
            var updatedInvestment = await _investmentService.UpdateInvestmentAsync(id, dto, userId);
            if (updatedInvestment == null)
                return NotFound($"Investment with ID {id} not found");
            return Ok(updatedInvestment);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteInvestment(Guid id)
        {
            var userId = GetCurrentUserId();
            var success = await _investmentService.DeleteInvestmentAsync(id, userId);
            if (!success)
                return NotFound($"Investment with ID {id} not found");
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