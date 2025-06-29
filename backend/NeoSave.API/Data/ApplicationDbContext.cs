using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NeoSave.API.Models;

namespace NeoSave.API.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Budget> Budgets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Budget>()
                .Property(b => b.Amount)
                .HasPrecision(18, 2); // 18 digits, 2 decimal places
        }

        public void Seed()
        {
            if (!Users.Any())
            {
                var user1 = new Models.AppUser
                {
                    Name = "Alice",
                    Email = "alice@example.com",
                    Password = "password123",
                    Budgets = new List<Budget>
                    {
                        new Budget
                        {
                            Name = "Groceries",
                            Amount = 500,
                            StartDate = DateTime.Now.AddDays(-10),
                            EndDate = DateTime.Now.AddDays(20),
                            Category = "Food",
                            Description = "Monthly groceries"
                        }
                    }
                };

                var user2 = new Models.AppUser
                {
                    Name = "Bob",
                    Email = "bob@example.com",
                    Password = "password456",
                    Budgets = new List<Models.Budget>
                    {
                        new Models.Budget
                        {
                            Name = "Transport",
                            Amount = 200,
                            StartDate = DateTime.Now.AddDays(-5),
                            EndDate = DateTime.Now.AddDays(25),
                            Category = "Travel",
                            Description = "Bus and taxi"
                        }
                    }
                };

                Users.AddRange(user1, user2);
                Users.AddRange(user1, user2); // Remove this line

                // Add users to the AppUser DbSet (from IdentityDbContext)
                Set<AppUser>().AddRange(user1, user2);
                SaveChanges();
            }
        }


    }
}
