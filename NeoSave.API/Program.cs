using Microsoft.EntityFrameworkCore;
using NeoSave.Application.Interfaces;
using NeoSave.Application.Services;
using NeoSave.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<NeoSaveDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Inject application services
builder.Services.AddScoped<IAuthService, AuthService>();

var app = builder.Build();

// Ensure database is created and migrations are applied
/*using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<NeoSaveDbContext>();
    dbContext.Database.Migrate();
}
*/

app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthorization();
app.MapControllers();
app.Run();
