using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace NeoSave.Infrastructure.Data
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<NeoSaveDbContext>
    {
        public NeoSaveDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<NeoSaveDbContext>();
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=NeoSave;Username=postgres;Password=Kgar3@#!");

            return new NeoSaveDbContext(optionsBuilder.Options);
        }
    }
}