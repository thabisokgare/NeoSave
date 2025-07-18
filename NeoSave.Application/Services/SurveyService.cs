using System;
using System.Threading.Tasks;
using NeoSave.Application.DTOs.Survey;
using NeoSave.Application.Interfaces;
using NeoSave.Domain.Entities;
using NeoSave.Infrastructure.Data;

namespace NeoSave.Application.Services
{
    public class SurveyService(NeoSaveDbContext db) : ISurveyService
    {
        private readonly NeoSaveDbContext _db = db;

        public async Task SubmitSurveyAsync(SurveyResponseDto dto, Guid userId)
        {
            var entity = new SurveyResponse
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                HasSavingsGoal = dto.HasSavingsGoal,
                SavingsTarget = dto.SavingsTarget,
                SpecificGoal = dto.SpecificGoal,
                TracksExpenses = dto.TracksExpenses,
                Challenges = dto.Challenges,
                SubmittedAt = DateTime.UtcNow
            };
            _db.SurveyResponses.Add(entity);
            await _db.SaveChangesAsync();
        }
    }
}