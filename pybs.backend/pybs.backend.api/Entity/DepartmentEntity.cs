using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace pybs.backend.api.Entity
{
    [Table(nameof(DepartmentEntity))]
    public class DepartmentEntity
    {

        [Key, Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        [InverseProperty("Department")]
        public ICollection<EmployeeEntity> Employees { get; } = new List<EmployeeEntity>();

        [InverseProperty("Department")]
        public ICollection<ProjectEntity> Projects { get; } = new List<ProjectEntity>();
    }
}
