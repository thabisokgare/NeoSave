using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeoSave.Domain.Entities;
using NeoSave.Domain.Enums;

namespace NeoSave.Infrastructure.Data
{
    public class NeoSaveDbContext(DbContextOptions<NeoSaveDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Budget> Budgets { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<Investment> Investments { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<NeoSave.Domain.Entities.SurveyResponse> SurveyResponses { get; set; }

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

            // Goal entity configuration
            modelBuilder.Entity<Goal>(entity =>
            {
                entity.Property(g => g.Id).HasColumnType("uuid");
                entity.Property(g => g.UserId).HasColumnType("uuid");
                entity.Property(g => g.Title).HasMaxLength(100).IsRequired();
                entity.Property(g => g.TargetAmount).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(g => g.CurrentAmount).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(g => g.DueDate).IsRequired();
                entity.Property(g => g.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.HasOne<User>().WithMany().HasForeignKey(g => g.UserId).OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(g => g.UserId);
            });

            // Investment entity configuration
            modelBuilder.Entity<Investment>(entity =>
            {
                entity.Property(i => i.Id).HasColumnType("uuid");
                entity.Property(i => i.UserId).HasColumnType("uuid");
                entity.Property(i => i.Name).HasMaxLength(100).IsRequired();
                entity.Property(i => i.Type).HasMaxLength(50).IsRequired();
                entity.Property(i => i.Amount).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(i => i.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.HasOne<User>().WithMany().HasForeignKey(i => i.UserId).OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(i => i.UserId);
            });

            // Transaction entity configuration
            modelBuilder.Entity<Transaction>(entity =>
            {
                entity.Property(t => t.Id).HasColumnType("uuid");
                entity.Property(t => t.UserId).HasColumnType("uuid");
                entity.Property(t => t.Amount).HasColumnType("decimal(18,2)").IsRequired();
                entity.Property(t => t.Type).HasMaxLength(20).IsRequired();
                entity.Property(t => t.Date).IsRequired();
                entity.Property(t => t.Category).HasMaxLength(50);
                entity.HasOne<User>().WithMany().HasForeignKey(t => t.UserId).OnDelete(DeleteBehavior.Cascade);
                entity.HasIndex(t => t.UserId);
            });

            modelBuilder.ApplyConfiguration(new Configurations.SurveyResponseConfiguration());
        }
    }
}