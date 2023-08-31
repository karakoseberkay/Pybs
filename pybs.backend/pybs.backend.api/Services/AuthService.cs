using pybs.backend.api.Entity;
using pybs.backend.api.Interfaces;

namespace pybs.backend.api.Services
{
    public class AuthService : IAuthService
    {
        public Task<UserLoginResponse> LoginUserAsync(UserLoginRequest request)
        {
            UserLoginResponse response = new();

            if (string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                throw new ArgumentNullException(nameof(request));
            }

            if (request.Username == "onur" && request.Password == "123456")
            {
                response.AccessTokenExpireDate = DateTime.UtcNow;
                response.AuthenticateResult = true;
                response.AuthToken = string.Empty;
            }

            return Task.FromResult(response);
        }
    }
}
