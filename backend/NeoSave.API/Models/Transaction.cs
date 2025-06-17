namespace NeoSave.API.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public required string Description { get; set; }
        public DateTime Date { get; set; }
        public required string Category { get; set; }
        public TransactionType Type { get; set; }
        public int UserId { get; set; }
        public User? User { get; set; }
    }

    public enum TransactionType
    {
        Income,
        Expense
    }
}
