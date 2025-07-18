using System;

namespace NeoSave.Domain.Entities
{
    public class SurveyResponse
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string HasSavingsGoal { get; set; } = string.Empty;
        public string SavingsTarget { get; set; } = string.Empty;
        public string SpecificGoal { get; set; } = string.Empty;
        public string TracksExpenses { get; set; } = string.Empty;
        public string Challenges { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}