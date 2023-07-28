namespace pybs.backend.api.DTO.ProjectDto
{
    public class ProjectListDto
    {
        public int ProjectId { get; set; }


        public string ProjectName { get; set; } = string.Empty;

        public string? DepartmentName { get; set; }
    }
}
