using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RECMS.Data
{
    public class DataContext : IdentityDbContext <AppUser>
    {
        public DbSet<Client> Clients { get; set; } = null!; 

        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<AppUser>().Property(u => u.Link).Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        }
    }
}
