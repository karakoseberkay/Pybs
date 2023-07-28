namespace pybs.backend.api.DTO.EmployeeDto
{
    public class EmployeeListDto
    {
        public int EmployeeId { get; set; }
        public string EmployeeName { get; set; } = string.Empty;

        public string EmployeeIdNumber { get; set; } = string.Empty;


        public string EmployeeLevel { get; set; } = string.Empty;

        public int EmployeeExp { get; set; }
        public string OffDay { get; set; } = string.Empty;


        public string? ProjectName { get; set; }

        public string? DepartmentName { get; set; }
    }
}
