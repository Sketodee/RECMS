using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace RECMS.Data
{
    public class DataContext : IdentityDbContext <AppUser>
    {
        public DbSet<Testing> Testings { get; set; } = null!;
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Testing>().HasData(
            new Testing()
            {
                Id = 1, 
                Name = "Fantasma", 
                Hobby = "Soccer"
            },
             new Testing()
             {
                 Id = 2,
                 Name = "Diablo",
                 Hobby = "Witch-hunting"
             },
              new Testing()
              {
                  Id = 3,
                  Name = "Ghost",
                  Hobby = "Haunting"
              }
           );
        }
    }
}
