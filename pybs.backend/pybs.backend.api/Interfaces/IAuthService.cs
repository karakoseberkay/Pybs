using pybs.backend.api.Entity;

namespace pybs.backend.api.Interfaces
{
    public interface IAuthService
    {
        public Task<UserLoginResponse> LoginUserAsync(UserLoginRequest request);
    }
}
