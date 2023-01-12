using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using RECMS.Services;

namespace RECMS.Controllers
{
    [ApiController]
    [Route("[Controller]"), Authorize]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IAccountService _accountService;

        public AccountController(UserManager<AppUser> userManager, IAccountService accountService)
        {
            _userManager = userManager;
            _accountService = accountService;
        }

        [HttpPost("signup"), AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<User>>> Signup(User user)
        {
            var response = await _accountService.Signup(user);
            return Ok(response);
        }
        
        
        [HttpPost("createadmin"), AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<User>>> CreateAdmin(User user)
        {
            var response = await _accountService.CreateAdmin(user);
            return Ok(response);
        }

        [HttpGet("testendpoint"), Authorize(Roles = "User")]
        public IActionResult Get()
        {
            return Ok("hey");
        }

        [HttpPost("login"), AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<LoginCred>>> Login(LoginUser login)
        {
            var response = await _accountService.Login(login); 
            return Ok(response);
        }
    }
}
