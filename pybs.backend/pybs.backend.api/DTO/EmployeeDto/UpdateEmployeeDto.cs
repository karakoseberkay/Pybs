namespace pybs.backend.api.DTO.EmployeeDto
{
    public class UpdateEmployeeDto
    {
        public string EmployeeName { get; set; }
        public int DepartmentId { get; set; }
        public string EmployeeLevel { get; set; }

        public int ProjectId { get; set; }
    }
}
