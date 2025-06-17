namespace NeoSave.API.Models
{
    public class FinancialQuestionnaire
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public required decimal MonthlyIncome { get; set; }
        public required decimal MonthlySavingsGoal { get; set; }
        public required string RiskTolerance { get; set; }  // Low, Medium, High
        public required string FinancialGoals { get; set; }
        public required string SpendingPriorities { get; set; }
        public DateTime CompletedAt { get; set; }
        public User? User { get; set; }
    }
}