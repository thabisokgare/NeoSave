using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Investment;
using NeoSave.Application.Interfaces;
using NeoSave.Domain.Entities;

namespace NeoSave.Application.Services
{
    public class InvestmentService : IInvestmentService
    {
        // TODO: Replace with proper database/repository pattern
        // This static collection is NOT thread-safe and should only be used for development
        private static readonly List<Investment> _investments = new();
        private static readonly object _lockObject = new object();

        public async Task<IEnumerable<InvestmentDto>> GetUserInvestmentsAsync(Guid userId)
        {
            // Input validation
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty", nameof(userId));

            await Task.CompletedTask; // Placeholder for async operation
            
            lock (_lockObject)
            {
                return _investments
                    .Where(i => i.UserId == userId)
                    .Select(MapToDto)
                    .ToList(); // Materialize to avoid deferred execution issues
            }
        }

        public async Task<InvestmentDto> GetInvestmentAsync(Guid id, Guid userId)
        {
            // Input validation
            if (id == Guid.Empty)
                throw new ArgumentException("Investment ID cannot be empty", nameof(id));
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty", nameof(userId));

            await Task.CompletedTask; // Placeholder for async operation
            
            lock (_lockObject)
            {
                var investment = _investments.FirstOrDefault(i => i.Id == id && i.UserId == userId);
                return investment == null ? throw new KeyNotFoundException($"Investment with ID {id} not found") : MapToDto(investment);
            }
        }

        public async Task<InvestmentDto> CreateInvestmentAsync(CreateInvestmentDto dto, Guid userId)
        {
            // Input validation
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty", nameof(userId));
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Investment name is required", nameof(dto.Name));
            if (dto.Amount <= 0)
                throw new ArgumentException("Investment amount must be greater than zero", nameof(dto.Amount));

            await Task.CompletedTask; // Placeholder for async operation

            var investment = new Investment
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Name = dto.Name.Trim(), // Always trim user input
                Type = dto.Type.Trim(),
                Amount = dto.Amount,
                Description = dto.Description.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            lock (_lockObject)
            {
                _investments.Add(investment);
            }

            return MapToDto(investment);
        }

        public async Task<InvestmentDto> UpdateInvestmentAsync(Guid id, UpdateInvestmentDto dto, Guid userId)
        {
            // Input validation
            if (id == Guid.Empty)
                throw new ArgumentException("Investment ID cannot be empty", nameof(id));
            if (dto == null)
                throw new ArgumentNullException(nameof(dto));
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty", nameof(userId));

            await Task.CompletedTask; // Placeholder for async operation

            lock (_lockObject)
            {
                var investment = _investments.FirstOrDefault(i => i.Id == id && i.UserId == userId);
                if (investment == null) 
                    throw new KeyNotFoundException($"Investment with ID {id} not found");

                // Only update fields that are provided and valid
                if (!string.IsNullOrWhiteSpace(dto.Name))
                    investment.Name = dto.Name.Trim();
                
                if (!string.IsNullOrWhiteSpace(dto.Type))
                    investment.Type = dto.Type.Trim();
                
                if (dto.Amount.HasValue)
                {
                    if (dto.Amount.Value <= 0)
                        throw new ArgumentException("Investment amount must be greater than zero");
                    investment.Amount = dto.Amount.Value;
                }
                
                if (dto.Description != null) // Allow empty string to clear description
                    investment.Description = dto.Description.Trim();

                return MapToDto(investment);
            }
        }

        public async Task<bool> DeleteInvestmentAsync(Guid id, Guid userId)
        {
            // Input validation
            if (id == Guid.Empty)
                throw new ArgumentException("Investment ID cannot be empty", nameof(id));
            if (userId == Guid.Empty)
                throw new ArgumentException("UserId cannot be empty", nameof(userId));

            await Task.CompletedTask; // Placeholder for async operation

            lock (_lockObject)
            {
                var investment = _investments.FirstOrDefault(i => i.Id == id && i.UserId == userId);
                if (investment == null) 
                    return false;

                _investments.Remove(investment);
                return true;
            }
        }

        /// <summary>
        /// Maps an Investment entity to an InvestmentDto.
        /// Renamed from ToDto for clarity and consistency.
        /// </summary>
        private static InvestmentDto MapToDto(Investment investment) => new()
        {
            Id = investment.Id,
            Name = investment.Name,
            Type = investment.Type,
            Amount = investment.Amount,
            Description = investment.Description,
            CreatedAt = investment.CreatedAt
        };
    }
}