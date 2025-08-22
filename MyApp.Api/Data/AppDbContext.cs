using Microsoft.EntityFrameworkCore;
using MyApp.Api.models; // matches your "models" folder

namespace MyApp.Api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Products> Products { get; set; }
    }
}
