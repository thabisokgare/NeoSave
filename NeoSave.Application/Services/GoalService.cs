using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeoSave.Application.DTOs.Goal;
using NeoSave.Application.Interfaces;
using NeoSave.Domain.Entities;
using NeoSave.Infrastructure.Data;

namespace NeoSave.Application.Services
{
    public class GoalService : IGoalService
    {
        private readonly NeoSaveDbContext _context;

        public GoalService(NeoSaveDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<IEnumerable<GoalDto>> GetUserGoalsAsync(Guid userId)
        {
            return await _context.Goals
                .Where(g => g.UserId == userId)
                .OrderByDescending(g => g.CreatedAt)
                .Select(g => ToDto(g))
                .ToListAsync();
        }

        public async Task<GoalDto> GetGoalAsync(Guid id, Guid userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
            return goal == null ? null : ToDto(goal);
        }

        public async Task<GoalDto> CreateGoalAsync(CreateGoalDto dto, Guid userId)
        {
            var goal = new Goal
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Title = dto.Title,
                Description = dto.Description,
                TargetAmount = dto.TargetAmount,
                CurrentAmount = 0,
                DueDate = dto.DueDate,
                CreatedAt = DateTime.UtcNow
            };
            
            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();
            
            return ToDto(goal);
        }

        public async Task<GoalDto> UpdateGoalAsync(Guid id, UpdateGoalDto dto, Guid userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
                
            if (goal == null) return null;
            
            if (dto.Title != null) goal.Title = dto.Title;
            if (dto.Description != null) goal.Description = dto.Description;
            if (dto.TargetAmount.HasValue) goal.TargetAmount = dto.TargetAmount.Value;
            if (dto.CurrentAmount.HasValue) goal.CurrentAmount = dto.CurrentAmount.Value;
            if (dto.DueDate.HasValue) goal.DueDate = dto.DueDate.Value;
            
            await _context.SaveChangesAsync();
            return ToDto(goal);
        }

        public async Task<bool> DeleteGoalAsync(Guid id, Guid userId)
        {
            var goal = await _context.Goals
                .FirstOrDefaultAsync(g => g.Id == id && g.UserId == userId);
                
            if (goal == null) return false;
            
            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();
            return true;
        }

        private static GoalDto ToDto(Goal g) => new()
        {
            Id = g.Id,
            Title = g.Title,
            Description = g.Description,
            TargetAmount = g.TargetAmount,
            CurrentAmount = g.CurrentAmount,
            DueDate = g.DueDate,
            CreatedAt = g.CreatedAt
        };
    }
}