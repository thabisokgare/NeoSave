using Microsoft.AspNetCore.Mvc;
using NeoSave.API.Services;
using NeoSave.API.Models;

namespace NeoSave.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        // GET: api/transaction
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var transactions = await _transactionService.GetAllTransactionsAsync();
            return Ok(transactions);
        }

        // GET: api/transaction/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var transaction = await _transactionService.GetTransactionByIdAsync(id);
            if (transaction == null)
                return NotFound();
            return Ok(transaction);
        }

        // POST: api/transaction
        [HttpPost]
        public async Task<IActionResult> Create(Transaction transaction)
        {
            var created = await _transactionService.CreateTransactionAsync(transaction);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT: api/transaction/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Transaction transaction)
        {
            if (id != transaction.Id)
                return BadRequest();

            var result = await _transactionService.UpdateTransactionAsync(transaction);
            if (!result)
                return NotFound();
            return NoContent();
        }

        // DELETE: api/transaction/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _transactionService.DeleteTransactionAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }
    }
}
