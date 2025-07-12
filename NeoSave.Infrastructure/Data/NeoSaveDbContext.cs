using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NeoSave.Domain.Entities;

namespace NeoSave.Infrastructure.Data
{
    public class NeoSaveDbContext : DbContext
    {
        public NeoSaveDbContext(DbContextOptions<NeoSaveDbContext> options)
            : base(options)
        {
        }
        public DbSet<User> Users  { get; set; }

    }
}