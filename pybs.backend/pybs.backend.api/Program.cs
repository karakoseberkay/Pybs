using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using pybs.backend.api.Entity;
using pybs.backend.api.Interfaces;
using pybs.backend.api.Services;
using System.Text;

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

            builder.Services.AddTransient<IAuthService, AuthService>();
            builder.Services.AddTransient<ITokenService, TokenService>();

            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true); 


           /* builder.Services.AddDbContext<DataContext>(o =>
            {
                var connectionString = Environment.GetEnvironmentVariable("Postgres_Db");
                o.UseNpgsql(connectionString);
            });
           */

            builder.Services.AddDbContext<DataContext>(

           o => o.UseNpgsql(builder.Configuration.GetConnectionString("Postgres_Db"))

           );


            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                


            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.RequireHttpsMetadata = false;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = builder.Configuration["AppSettings:ValidIssuer"],
                    ValidAudience = builder.Configuration["AppSettings:ValidAudience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Secret"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = false,
                    ValidateIssuerSigningKey = false
                };

                options.Events = new JwtBearerEvents
                {
                    OnChallenge = context => {
                        Console.WriteLine("OnChallenge:");
                        return Task.CompletedTask;
                    },
                    OnAuthenticationFailed = context => {
                        Console.WriteLine("OnAuthenticationFailed:");
                        return Task.CompletedTask;
                    },
                    OnMessageReceived = context => {
                        Console.WriteLine("OnMessageReceived:");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context => {
                        Console.WriteLine("OnTokenValidated:");
                        return Task.CompletedTask;
                    },
                };
            });

            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireDirector", policy =>
        policy.RequireClaim("EmployeeLevel", "Yönetici"));
            });

            var app = builder.Build();

            app.UseSwagger();
            app.UseSwaggerUI();

            // CORS politikalarýný burada tanýmlayýn
            app.UseCors(options =>
            {
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
