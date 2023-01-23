using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RECMS.Dtos;
using RECMS.Services;

namespace RECMS.Controllers
{
    [Route("[controller]"), Authorize]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;

        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }
        [HttpPost("registerclient")]
        public async Task<ActionResult<ServiceResponse<ClientDto>>> RegisterClient(ClientDto clientDto)
        {
            var response = await _clientService.RegisterClient(clientDto);
            return Ok(response);
        }

        [HttpGet, AllowAnonymous]
        public IActionResult Get ()
        {
            return Ok("hey");
        }
    }
}
