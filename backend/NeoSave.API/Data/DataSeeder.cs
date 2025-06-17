using NeoSave.API.Models;

namespace NeoSave.API.Data
{
    public static class DataSeeder
    {
        public static void SeedData(AppDbContext context)
        {
            if (!context.Users.Any())
            {
                var users = new List<User>
                {
                    new User
                    {
                        Username = "john.doe",
                        Email = "john@example.com",
                        PasswordHash = "hashedpassword123",
                        CreatedAt = DateTime.UtcNow
                    },
                    new User
                    {
                        Username = "jane.smith",
                        Email = "jane@example.com",
                        PasswordHash = "hashedpassword456",
                        CreatedAt = DateTime.UtcNow
                    }
                };
                context.Users.AddRange(users);
                context.SaveChanges();

                var transactions = new List<Transaction>
                {
                    new Transaction
                    {
                        Amount = 1000.00m,
                        Description = "Salary",
                        Date = DateTime.UtcNow.AddDays(-5),
                        Category = "Income",
                        Type = TransactionType.Income,
                        UserId = users[0].Id
                    },
                    new Transaction
                    {
                        Amount = -50.00m,
                        Description = "Grocery Shopping",
                        Date = DateTime.UtcNow.AddDays(-2),
                        Category = "Food",
                        Type = TransactionType.Expense,
                        UserId = users[0].Id
                    }
                };
                context.Transactions.AddRange(transactions);

                var budgets = new List<Budget>
                {
                    new Budget
                    {
                        Category = "Food",
                        Amount = 500.00m,
                        StartDate = new DateTime(2025, 6, 1),
                        EndDate = new DateTime(2025, 6, 30),
                        UserId = users[0].Id
                    },
                    new Budget
                    {
                        Category = "Transportation",
                        Amount = 200.00m,
                        StartDate = new DateTime(2025, 6, 1),
                        EndDate = new DateTime(2025, 6, 30),
                        UserId = users[1].Id
                    }
                };
                context.Budgets.AddRange(budgets);
                context.SaveChanges();
            }
        }
    }
}