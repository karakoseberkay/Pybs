using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using pybs.backend.api.Entity;

namespace pybs.backend.api.DTO.EmployeeDto
{
    public class AddEmployeeDto
    {
        public string EmployeeName { get; set; }

        public string EmployeeIdNumber { get; set; }
       
        public string EmployeeLevel { get; set; } = string.Empty;

        public int EmployeeExp { get; set; }
        public string OffDay { get; set; } = string.Empty;

        public int DepartmentId { get; set; }

        public int ProjectId { get; set; }
        
    }
}
