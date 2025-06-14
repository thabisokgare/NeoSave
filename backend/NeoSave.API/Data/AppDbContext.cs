using Microsoft.EntityFrameworkCore;
using NeoSave.API.Models;

namespace NeoSave.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Transaction> Transactions { get; set; }  // Use getter/setter here
    }
}
