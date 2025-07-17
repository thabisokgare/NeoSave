using System;

namespace NeoSave.Application.DTOs.Goal
{
    public class UpdateGoalDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal? TargetAmount { get; set; }
        public decimal? CurrentAmount { get; set; }
        public DateTime? DueDate { get; set; }
    }
}