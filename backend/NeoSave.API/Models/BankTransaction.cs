namespace NeoSave.API.Models
{
    public class BankTransaction
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public required string BankName { get; set; }
        public required string AccountNumber { get; set; }
        public required decimal Amount { get; set; }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public DateTime TransactionDate { get; set; }
        public User? User { get; set; }
    }
}