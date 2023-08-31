using pybs.backend.api.Entity;

namespace pybs.backend.api.Interfaces
{
    public interface ITokenService
    {
        public Task<GenerateTokenResponse> GenerateToken(GenerateTokenRequest request);
       
    }
}
