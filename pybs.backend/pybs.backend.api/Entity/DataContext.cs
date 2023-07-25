using Microsoft.EntityFrameworkCore;
using System;


namespace pybs.backend.api.Entity
{
    public class DataContext : DbContext

    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       => optionsBuilder.UseNpgsql("Server=localhost;Database=postgres;Port=5432;User Id=postgres;Password=postgres;");

        public DataContext(DbContextOptions<DataContext>options): base(options) { }

        public DbSet<DepartmentEntity> DepartmentEntities { get; set; }
        public DbSet<ProjectEntity> ProjectEntities { get; set; }
        public DbSet<EmployeeEntity> EmployeeEntities { get; set; }


    }
}
