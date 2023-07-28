using Microsoft.AspNetCore.Mvc;
using pybs.backend.api.Entity;
using pybs.backend.api.DTO.EmployeeDto;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pybs.backend.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public EmployeeController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }




        // GET: api/<DepartmentController>
        [HttpGet]
public IEnumerable<EmployeeListDto> GetEmployees()
{
    //var employeesFromDatabase = _dataContext.EmployeeEntities.ToList();

    var employeeDtos = _dataContext.EmployeeEntities.Select(employeeEntity => new EmployeeListDto
    {
        EmployeeId = employeeEntity.EmployeeId,
        EmployeeName = employeeEntity.EmployeeName,
        EmployeeIdNumber = employeeEntity.EmployeeIdNumber,
        EmployeeLevel = employeeEntity.EmployeeLevel,
        EmployeeExp = employeeEntity.EmployeeExp,
        DepartmentName = employeeEntity.Department.DepartmentName,
        ProjectName = employeeEntity.Project.ProjectName,
        OffDay = employeeEntity.OffDay
    });

    return employeeDtos;
}

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public EmployeeDetailDto? Get(int id)
        {
            return _dataContext.EmployeeEntities.Select(t=> new EmployeeDetailDto
            {
                EmployeeId=t.EmployeeId,
                EmployeeName=t.EmployeeName,
                EmployeeIdNumber=t.EmployeeIdNumber,
                EmployeeLevel = t.EmployeeLevel,
                EmployeeExp = t.EmployeeExp,
                DepartmentId = t.DepartmentId,
                OffDay=t.OffDay,
                ProjectId = t.ProjectId
            }).FirstOrDefault(s => s.EmployeeId == id);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public string Post([FromBody] AddEmployeeDto employee)
        {
            if (!ModelState.IsValid)
                return "Başarısız";

            var EmployeeToSave = new EmployeeEntity();
            EmployeeToSave.EmployeeName = employee.EmployeeName;
            EmployeeToSave.EmployeeIdNumber = employee.EmployeeIdNumber;
            EmployeeToSave.EmployeeLevel = employee.EmployeeLevel;
            EmployeeToSave.EmployeeExp = employee.EmployeeExp;
            EmployeeToSave.DepartmentId = employee.DepartmentId;
            EmployeeToSave.ProjectId = employee.ProjectId;
            EmployeeToSave.OffDay = employee.OffDay;

            _dataContext.EmployeeEntities.Add(EmployeeToSave);
            _dataContext.SaveChanges();

            return "Ekleme Başarılı";
        }

        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public string PutAsync(int id, [FromBody] UpdateEmployeeDto employee)
        {
            var EmployeeFromDatabase = _dataContext.EmployeeEntities.FirstOrDefault(s => s.EmployeeId == id);

            if (EmployeeFromDatabase == null)
                return "Çalışan Bulunamadı";

            EmployeeFromDatabase.EmployeeName = employee.EmployeeName;
            EmployeeFromDatabase.DepartmentId = employee.DepartmentId;
            EmployeeFromDatabase.EmployeeLevel = employee.EmployeeLevel;
            EmployeeFromDatabase.ProjectId = employee.ProjectId;
            _dataContext.EmployeeEntities.Update(EmployeeFromDatabase);
            _dataContext.SaveChanges();

            return "Güncelleme Başarılı";

        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var EmployeeValue = await _dataContext.EmployeeEntities.FindAsync(id);

            if (EmployeeValue == null)
            {
                return NotFound();
            }

            _dataContext.EmployeeEntities.Remove(EmployeeValue);
            await _dataContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
