using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pybs.backend.api.Entity
{
    [Table(nameof(EmployeeEntity))]
    public class EmployeeEntity
    {

            [Key, Required]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

            public int EmployeeId { get; set; }
            public string EmployeeName { get; set; } = string.Empty;

        public string EmployeeIdNumber { get; set; } = string.Empty;

      
        public string EmployeeLevel { get; set; } = string.Empty;

        public int  EmployeeExp { get; set; }
        public string OffDay { get; set; } = string.Empty;

        public int ProjectId { get; set; }
       
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; } = string.Empty;
            public virtual DepartmentEntity? Department { get; set; }
         public virtual ProjectEntity? ProjectEntity { get; set; }
        
    }
}
