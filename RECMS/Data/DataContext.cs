using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace RECMS.Data
{
    public class DataContext : DbContext
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
                Name = "fantasma", 
                Hobby = "Soccer"
            },
             new Testing()
             {
                 Id = 2,
                 Name = "diablo",
                 Hobby = "Witch-hunt"
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
