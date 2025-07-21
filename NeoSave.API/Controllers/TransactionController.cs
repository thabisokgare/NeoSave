using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NeoSave.Application.DTOs.Transaction;
using NeoSave.Application.Interfaces;
using System.Security.Claims;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TransactionController(ITransactionService transactionService) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TransactionDto>>> GetUserTransactions()
        {
            var userId = GetCurrentUserId();
            var transactions = await transactionService.GetUserTransactionsAsync(userId);
            return Ok(transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDto>> GetTransaction(Guid id)
        {
            var userId = GetCurrentUserId();
            var transaction = await transactionService.GetTransactionAsync(id, userId);
            if (transaction == null)
                return NotFound($"Transaction with ID {id} not found");
            return Ok(transaction);
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> CreateTransaction(CreateTransactionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var userId = GetCurrentUserId();
            var createdTransaction = await transactionService.CreateTransactionAsync(dto, userId);
            return CreatedAtAction(nameof(GetTransaction), new { id = createdTransaction.Id }, createdTransaction);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<TransactionDto>> UpdateTransaction(Guid id, UpdateTransactionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var userId = GetCurrentUserId();
            var updatedTransaction = await transactionService.UpdateTransactionAsync(id, dto, userId);
            if (updatedTransaction == null)
                return NotFound($"Transaction with ID {id} not found");
            return Ok(updatedTransaction);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTransaction(Guid id)
        {
            var userId = GetCurrentUserId();
            var success = await transactionService.DeleteTransactionAsync(id, userId);
            if (!success)
                return NotFound($"Transaction with ID {id} not found");
            return NoContent();
        }

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