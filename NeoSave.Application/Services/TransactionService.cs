using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeoSave.Application.DTOs.Transaction;
using NeoSave.Application.Interfaces;
using NeoSave.Domain.Entities;
using NeoSave.Infrastructure.Data;

namespace NeoSave.Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly NeoSaveDbContext _context;

        public TransactionService(NeoSaveDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<TransactionDto>> GetUserTransactionsAsync(Guid userId)
        {
            return await _context.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .Select(t => ToDto(t))
                .ToListAsync();
        }

        public async Task<TransactionDto> GetTransactionAsync(Guid id, Guid userId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
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

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return ToDto(transaction);
        }

        public async Task<TransactionDto> UpdateTransactionAsync(Guid id, UpdateTransactionDto dto, Guid userId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (transaction == null) return null;

            if (dto.Amount.HasValue) transaction.Amount = dto.Amount.Value;
            if (dto.Type != null) transaction.Type = dto.Type;
            if (dto.Description != null) transaction.Description = dto.Description;
            if (dto.Date.HasValue) transaction.Date = dto.Date.Value;
            if (dto.Category != null) transaction.Category = dto.Category;

            await _context.SaveChangesAsync();
            return ToDto(transaction);
        }

        public async Task<bool> DeleteTransactionAsync(Guid id, Guid userId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (transaction == null) return false;

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
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