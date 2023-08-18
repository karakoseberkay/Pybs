using Microsoft.EntityFrameworkCore;
using pybs.backend.api.Entity;

namespace pybs.backend.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            builder.Services.AddDbContext<DataContext>(o =>
            {
                var connectionString = Environment.GetEnvironmentVariable("Postgres_Db");
                o.UseNpgsql(connectionString);
            });

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            // CORS politikalarýný burada tanýmlayýn
            app.UseCors(options =>
            {
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });

            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
