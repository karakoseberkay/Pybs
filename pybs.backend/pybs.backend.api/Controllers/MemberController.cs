using Microsoft.AspNetCore.Mvc;
using pybs.backend.api.Entity;

using Microsoft.AspNetCore.Authorization;
using pybs.backend.api.DTO.MemberDto;
using pybs.backend.api.DTO.MemberDtoDto;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace pybs.backend.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MemberController : ControllerBase
    {

        private readonly DataContext _dataContext;

        public MemberController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }




        // GET: api/<DepartmentController>
        [HttpGet]
        public IEnumerable<MemberEntity> GetMembers()
        {
            var DataBase = _dataContext.MemberEntities.ToList();
            return DataBase;
        }

        // GET api/<DepartmentController>/5
        [HttpGet("{id}")]
        public MemberEntity Get(int id)
        {
            return _dataContext.MemberEntities.FirstOrDefault(s => s.MemberId == id);
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public string Post([FromBody] AddMemberDto member)
        {
            if (!ModelState.IsValid)
                return "Başarısız";

            var MemberToSave = new MemberEntity();
            MemberToSave.MemberName = member.MemberName;

            _dataContext.MemberEntities.Add(MemberToSave);
            _dataContext.SaveChanges();

            return "Ekleme Başarılı";
        }

        // PUT api/<DepartmentController>/5
        [HttpPut("{id}")]
        public string PutAsync(int id, [FromBody] UpdateMemberDto member)
        {
            var MemberFromDatabase = _dataContext.MemberEntities.FirstOrDefault(s => s.MemberId == id);

            if (MemberFromDatabase == null)
                return "Departman Bulunamadı";

            MemberFromDatabase.MemberName = member.MemberName;
            _dataContext.MemberEntities.Update(MemberFromDatabase);
            _dataContext.SaveChanges();

            return "Güncelleme Başarılı";

        }

        // DELETE api/<DepartmentController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var MemberValue = await _dataContext.MemberEntities.FindAsync(id);

            if (MemberValue == null)
            {
                return NotFound();
            }

            _dataContext.MemberEntities.Remove(MemberValue);
            await _dataContext.SaveChangesAsync();

            return NoContent();
        }
    }
}
