


using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pybs.backend.api.DTO.File;
using pybs.backend.api.Entity;
using System.IO;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class FileUploadController : ControllerBase
{
    private readonly DataContext _dataContext;

    public FileUploadController(DataContext dataContext)
    {
        _dataContext = dataContext;
    }


    [HttpPost]
    [Route("upload/{employeeId}")]
    public async Task<IActionResult> UploadFile(int employeeId, [FromForm] FileDto File)
    {
        if (File.file == null || File.file.Length == 0)
            return BadRequest("Dosya seçilmedi.");

        // Dosya adını ve içeriğini alın
        var fileName = File.file.FileName;
        var fileContent = await ReadFileContent(File.file);

        var employee = _dataContext.EmployeeEntities.FirstOrDefault(e => e.EmployeeId == employeeId);

        if (employee == null)
        {
            return BadRequest("Employee bulunamadı");
        }

        employee.FileContent = fileContent;
        employee.FileName = fileName;

        _dataContext.SaveChanges();

        return Ok("Dosya başarıyla yüklendi.");
    }

    private async Task<byte[]> ReadFileContent([FromBody] IFormFile file)
    {
        using var memoryStream = new MemoryStream();
        await file.CopyToAsync(memoryStream);
        return memoryStream.ToArray();
    }


    [HttpGet]
    [Route("get/{employeeId}")]
    public async Task<IActionResult> GetDocumentContent(int employeeId)
    {
        var employee = _dataContext.EmployeeEntities.FirstOrDefault(e => e.EmployeeId == employeeId);

        if (employee == null || string.IsNullOrEmpty(employee.FileName) || employee.FileContent == null)
        {
            return NotFound("Belge bulunamadı.");
        }

        // Burada dosya içeriğini döndürmek için FileStreamResult veya başka bir uygun dönüş türü kullanabilirsiniz
        // Aşağıda örnek olarak FileStreamResult kullanılmıştır
        var fileStream = new MemoryStream(employee.FileContent);
        return new FileStreamResult(fileStream, "application/octet-stream")
        {
            FileDownloadName =  employee.FileName 
        }; // Dosya türüne göre ayarlayın
    }
}