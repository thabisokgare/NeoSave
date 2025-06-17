using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeoSave.API.Models;
using NeoSave.API.Repositories;  // Add this line

namespace NeoSave.API.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IRepository<Transaction> _transactionRepository;

        public TransactionService(IRepository<Transaction> transactionRepository)
        {
            _transactionRepository = transactionRepository ?? throw new ArgumentNullException(nameof(transactionRepository));
        }

        public async Task<IEnumerable<Transaction>> GetAllTransactionsAsync()
        {
            return await _transactionRepository.GetAllAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            return await _transactionRepository.GetByIdAsync(id);
        }

        public async Task<Transaction> CreateTransactionAsync(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));

            transaction.Date = DateTime.UtcNow;
            return await _transactionRepository.AddAsync(transaction);
        }

        public async Task<bool> UpdateTransactionAsync(Transaction transaction)
        {
            if (transaction == null)
                throw new ArgumentNullException(nameof(transaction));

            return await _transactionRepository.UpdateAsync(transaction);
        }

        public async Task<bool> DeleteTransactionAsync(int id)
        {
            return await _transactionRepository.DeleteAsync(id);
        }
    }
}