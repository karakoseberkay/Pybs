using Microsoft.AspNetCore.Mvc;
using pybs.backend.api.Entity;
using pybs.backend.api.DTO.DepartmentDto;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pybs.backend.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {

        private readonly DataContext _dataContext;

        public DepartmentController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }




        // GET: api/<DepartmentController>
        [HttpGet]
        public IEnumerable<DepartmentEntity> GetDepartments()
        {
            var DataBase = _dataContext.DepartmentEntities.ToList();
            return DataBase;
        }

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public DepartmentEntity Get(int id)
        {
            return _dataContext.DepartmentEntities.FirstOrDefault(s => s.DepartmentId == id);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public string Post([FromBody] AddDepartmentDto department)
        {
            if (!ModelState.IsValid)
                return "Başarısız";
            
            var DepartmentToSave = new DepartmentEntity();
            DepartmentToSave.DepartmentName = department.DepartmentName;

            _dataContext.DepartmentEntities.Add(DepartmentToSave);
            _dataContext.SaveChanges();

            return "Ekleme Başarılı";
        }

        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public string PutAsync(int id, [FromBody] UpdateDepartmentDto department)
        {
            var DepartmentFromDatabase = _dataContext.DepartmentEntities.FirstOrDefault(s => s.DepartmentId == id);

            if (DepartmentFromDatabase == null) 
                return "Departman Bulunamadı";

            DepartmentFromDatabase.DepartmentName = department.DepartmentName;
            _dataContext.DepartmentEntities.Update(DepartmentFromDatabase);
            _dataContext.SaveChanges();

            return "Güncelleme Başarılı";

        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var DepartmentValue = await _dataContext.DepartmentEntities.FindAsync(id);
            
            if (DepartmentValue == null)
            {
                return NotFound();
            }

            _dataContext.DepartmentEntities.Remove(DepartmentValue);
            await _dataContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
