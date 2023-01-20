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
        private readonly IHttpContextAccessor _accessor;

        public AccountController(UserManager<AppUser> userManager, IAccountService accountService, IHttpContextAccessor accessor)
        {
            _userManager = userManager;
            _accountService = accountService;
            _accessor = accessor;
        }

        [HttpPost("signup"), AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<UserDto>>> Signup(UserDto userDto)
        {
            var response = await _accountService.Signup(userDto);
            return Ok(response);
        }
        
        
        [HttpPost("createadmin"), AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<UserDto>>> CreateAdmin(UserDto userDto)
        {
            var response = await _accountService.CreateAdmin(userDto);
            return Ok(response);
        }

        [HttpGet("testendpoint"), Authorize(Roles = "Admin")]
        public IActionResult Get()
        {
            var value = HttpContext.Response.StatusCode;
            return Ok(value);
        }

        [HttpPost("login"), AllowAnonymous]
        public async Task<ActionResult<ServiceResponse<LoginCred>>> Login(LoginUser login)
        {
            var response = await _accountService.Login(login); 
            return Ok(response);
        }
    }
}
