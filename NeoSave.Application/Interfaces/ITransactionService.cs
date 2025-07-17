using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Transaction;

namespace NeoSave.Application.Interfaces
{
    public interface ITransactionService
    {
        Task<IEnumerable<TransactionDto>> GetUserTransactionsAsync(Guid userId);
        Task<TransactionDto> GetTransactionAsync(Guid id, Guid userId);
        Task<TransactionDto> CreateTransactionAsync(CreateTransactionDto dto, Guid userId);
        Task<TransactionDto> UpdateTransactionAsync(Guid id, UpdateTransactionDto dto, Guid userId);
        Task<bool> DeleteTransactionAsync(Guid id, Guid userId);
    }
}