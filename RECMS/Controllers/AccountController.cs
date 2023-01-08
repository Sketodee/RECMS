using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace RECMS.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        public AccountController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("signup")]
        public async Task<ServiceResponse<User>> Signup(User user)
        {
            ServiceResponse<User> response = new();
            try
            {
                AppUser appUser = new AppUser
                {
                    UserName = user.Email,
                    Email = user.Email,
                    FullName = user.FullName,
                    AccountDetails = user.AccountDetails,
                };

                IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);

                if (!result.Succeeded)
                {
                    response.Message = "can't create user " + result.Errors.FirstOrDefault()?.Description;
                    response.Success = false;
                    return response;
                }

                response.Success = true;
                response.Message = "user created successfully";
            }
            catch(Exception ex)
            {
                response.Message = ex.Message;  
                response.Success = false;
            }

            return response;
        }
    }
}
