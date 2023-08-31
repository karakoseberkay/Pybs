using Microsoft.EntityFrameworkCore;
using System;


namespace pybs.backend.api.Entity
{
    public class DataContext : DbContext

    {
        public DataContext(DbContextOptions<DataContext>options): base(options) { }

        public DbSet<DepartmentEntity> DepartmentEntities { get; set; }
        public DbSet<ProjectEntity> ProjectEntities { get; set; }
        public DbSet<EmployeeEntity> EmployeeEntities { get; set; }
        public DbSet<MemberEntity> MemberEntities { get; set; }

    }
}
