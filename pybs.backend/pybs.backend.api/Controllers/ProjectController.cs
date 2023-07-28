using Microsoft.AspNetCore.Mvc;
using pybs.backend.api.Entity;
using pybs.backend.api.DTO.ProjectDto;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pybs.backend.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public ProjectController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }




        // GET: api/<DepartmentController>
        [HttpGet]
        public IEnumerable<ProjectListDto> GetProjects()
        {
            // var DataBase = _dataContext.ProjectEntities.ToList();
            var ProjectDtos = _dataContext.ProjectEntities.Select(ProjectEntity => new ProjectListDto
            {
                ProjectId = ProjectEntity.ProjectId,
                ProjectName = ProjectEntity.ProjectName,
                DepartmentName = ProjectEntity.Department.DepartmentName
            });

            return ProjectDtos;
        }

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public ProjectDetailDto? Get(int id)
        {
            return _dataContext.ProjectEntities.Select(t => new ProjectDetailDto

            {
                ProjectId = t.ProjectId,
                ProjectName = t.ProjectName,
                DepartmentId = t.DepartmentId,
            }).FirstOrDefault(s => s.ProjectId == id);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public string Post([FromBody] AddProjectDto project)
        {
            if (!ModelState.IsValid)
                return "Başarısız";

            var ProjectToSave = new ProjectEntity();
            ProjectToSave.ProjectName = project.ProjectName;
            ProjectToSave.DepartmentId = project.DepartmentId;

            _dataContext.ProjectEntities.Add(ProjectToSave);
            _dataContext.SaveChanges();

            return "Ekleme Başarılı";
        }

        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public string PutAsync(int id, [FromBody] UpdateProjectDto project)
        {
            var ProjectFromDatabase = _dataContext.ProjectEntities.FirstOrDefault(s => s.ProjectId == id);

            if (ProjectFromDatabase == null)
                return "Proje Bulunamadı";

            ProjectFromDatabase.ProjectName = project.ProjectName;
            _dataContext.ProjectEntities.Update(ProjectFromDatabase);
            _dataContext.SaveChanges();

            return "Güncelleme Başarılı";

        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var ProjectValue = await _dataContext.ProjectEntities.FindAsync(id);

            if (ProjectValue == null)
            {
                return NotFound();
            }

            _dataContext.ProjectEntities.Remove(ProjectValue);
            await _dataContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
