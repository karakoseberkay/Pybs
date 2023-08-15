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
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


            builder.Services.AddDbContext<DataContext>(o => 
            {
                var connectionString = builder.Configuration.GetConnectionString("Postgres_Db");
                o.UseNpgsql(connectionString);
            });

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            //app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors(options =>
            {
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
            app.MapControllers();

            app.Run();
        }
    }
}


