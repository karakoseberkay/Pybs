using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pybs.backend.api.Entity;
using pybs.backend.api.Interfaces;
using pybs.backend.api.Services;

namespace pybs.backend.api.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly ITokenService tokenService;

        public AuthController(ITokenService tokenService)
        {
            this.tokenService = tokenService;
        }

        [HttpPost("LoginUser")]
        [AllowAnonymous]
        public async Task<ActionResult<GenerateTokenResponse>> GenerateTokenResponse([FromBody] GenerateTokenRequest request)
        {
            var result = await tokenService.GenerateToken(request);

            return result;
        }
    }
}
