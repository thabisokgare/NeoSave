using System;
using System.ComponentModel.DataAnnotations;

namespace NeoSave.Application.DTOs.Survey
{
    public class SurveyResponseDto
    {
        public Guid? UserId { get; set; } // Optional, set in backend if authenticated
        [Required]
        public string HasSavingsGoal { get; set; } = string.Empty;
        public string SavingsTarget { get; set; } = string.Empty;
        public string SpecificGoal { get; set; } = string.Empty;
        public string TracksExpenses { get; set; } = string.Empty;
        public string Challenges { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}