namespace pybs.backend.api.DTO.ProjectDto
{
    public class ProjectDetailDto
    {
        public int ProjectId { get; set; }


        public string ProjectName { get; set; } = string.Empty;

        public int? DepartmentId { get; set; }
    }
}
