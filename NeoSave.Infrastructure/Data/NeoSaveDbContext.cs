using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeoSave.Domain.Entities;
using NeoSave.Domain.Enums;

namespace NeoSave.Infrastructure.Data
{
    public class NeoSaveDbContext : DbContext
    {
        public NeoSaveDbContext(DbContextOptions<NeoSaveDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Budget> Budgets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User entity configuration
            modelBuilder.Entity<User>()
                .Property(u => u.Id)
                .HasColumnType("uuid");

            // Budget entity configuration
            modelBuilder.Entity<Budget>(entity =>
            {
                entity.Property(b => b.Id)
                    .HasColumnType("uuid");

                entity.Property(b => b.UserId)
                    .HasColumnType("uuid");

                entity.Property(b => b.Name)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(b => b.Amount)
                    .HasColumnType("decimal(18,2)")
                    .IsRequired();

                entity.Property(b => b.Category)
                    .HasConversion<int>() // Store enum as integer
                    .IsRequired();

                entity.Property(b => b.CreatedAt)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP");

                entity.Property(b => b.StartDate)
                    .IsRequired();

                entity.Property(b => b.EndDate)
                    .IsRequired();

                // Foreign key relationship
                entity.HasOne(b => b.User)
                    .WithMany()
                    .HasForeignKey(b => b.UserId)
                    .OnDelete(DeleteBehavior.Cascade);

                // Index for better query performance
                entity.HasIndex(b => b.UserId);
                entity.HasIndex(b => b.Category);
            });
        }
    }
}