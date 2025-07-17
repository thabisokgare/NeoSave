using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Transaction;
using NeoSave.Application.Interfaces;
using NeoSave.Domain.Entities;

namespace NeoSave.Application.Services
{
    public class TransactionService : ITransactionService
    {
        // In-memory store for demonstration
        private static readonly List<Transaction> _transactions = new();

        public async Task<IEnumerable<TransactionDto>> GetUserTransactionsAsync(Guid userId)
        {
            return _transactions.Where(t => t.UserId == userId)
                .Select(t => ToDto(t));
        }

        public async Task<TransactionDto> GetTransactionAsync(Guid id, Guid userId)
        {
            var transaction = _transactions.FirstOrDefault(t => t.Id == id && t.UserId == userId);
            return transaction == null ? null : ToDto(transaction);
        }

        public async Task<TransactionDto> CreateTransactionAsync(CreateTransactionDto dto, Guid userId)
        {
            var transaction = new Transaction
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Amount = dto.Amount,
                Type = dto.Type,
                Description = dto.Description,
                Date = dto.Date,
                Category = dto.Category
            };
            _transactions.Add(transaction);
            return ToDto(transaction);
        }

        public async Task<TransactionDto> UpdateTransactionAsync(Guid id, UpdateTransactionDto dto, Guid userId)
        {
            var transaction = _transactions.FirstOrDefault(t => t.Id == id && t.UserId == userId);
            if (transaction == null) return null;
            if (dto.Amount.HasValue) transaction.Amount = dto.Amount.Value;
            if (dto.Type != null) transaction.Type = dto.Type;
            if (dto.Description != null) transaction.Description = dto.Description;
            if (dto.Date.HasValue) transaction.Date = dto.Date.Value;
            if (dto.Category != null) transaction.Category = dto.Category;
            return ToDto(transaction);
        }

        public async Task<bool> DeleteTransactionAsync(Guid id, Guid userId)
        {
            var transaction = _transactions.FirstOrDefault(t => t.Id == id && t.UserId == userId);
            if (transaction == null) return false;
            _transactions.Remove(transaction);
            return true;
        }

        private static TransactionDto ToDto(Transaction t) => new()
        {
            Id = t.Id,
            Amount = t.Amount,
            Type = t.Type,
            Description = t.Description,
            Date = t.Date,
            Category = t.Category
        };
    }
}