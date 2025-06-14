namespace NeoSave.API.Models;

public class Transaction
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string Category { get; set; } = string.Empty;
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string Type { get; set; } = string.Empty; // Income / Expense
    public string PaymentMethod { get; set; } = string.Empty;
    public string UserId { get; set; } = string.Empty;
}
