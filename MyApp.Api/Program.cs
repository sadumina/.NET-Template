using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace MyApp.Api
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

            // ✅ Enable CORS for React (http://localhost:3000)
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy.WithOrigins("http://localhost:3000") // React dev server
                                    .AllowAnyHeader()
                                    .AllowAnyMethod());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // ✅ Enable CORS before mapping controllers
            app.UseCors("AllowReactApp");

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

// This is the code that makes the GET request to the API

