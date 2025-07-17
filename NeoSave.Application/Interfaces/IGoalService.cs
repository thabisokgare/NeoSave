using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Goal;

namespace NeoSave.Application.Interfaces
{
    public interface IGoalService
    {
        Task<IEnumerable<GoalDto>> GetUserGoalsAsync(Guid userId);
        Task<GoalDto> GetGoalAsync(Guid id, Guid userId);
        Task<GoalDto> CreateGoalAsync(CreateGoalDto dto, Guid userId);
        Task<GoalDto> UpdateGoalAsync(Guid id, UpdateGoalDto dto, Guid userId);
        Task<bool> DeleteGoalAsync(Guid id, Guid userId);
    }
}