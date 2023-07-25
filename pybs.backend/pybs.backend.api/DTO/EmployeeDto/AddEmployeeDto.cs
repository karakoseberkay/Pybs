using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using pybs.backend.api.Entity;

namespace pybs.backend.api.DTO.EmployeeDto
{
    [Table(nameof(AddEmployeeDto))]
    public class AddEmployeeDto
    {

        [Key, Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public string EmployeeName { get; set; }

        public string EmployeeIdNumber { get; set; }
       
        public string EmployeeLevel { get; set; } = string.Empty;

        public int EmployeeExp { get; set; }
        public string OffDay { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public string DepartmentName { get; set; }=string.Empty;
        public int ProjectId { get; set; }
        
    }
}
