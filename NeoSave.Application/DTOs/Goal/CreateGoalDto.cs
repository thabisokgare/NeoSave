using System;

namespace NeoSave.Application.DTOs.Goal
{
    public class CreateGoalDto
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal TargetAmount { get; set; }
        public DateTime DueDate { get; set; }
    }
}