using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace RECMS.Services
{
    public class ClientService : IClientService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IHttpContextAccessor _accessor;
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public ClientService(UserManager<AppUser> userManager, IHttpContextAccessor accessor, IMapper mapper, DataContext context)
        {
            _userManager = userManager;
            _accessor = accessor;
            _mapper = mapper;
            _context = context;
        }

        public async Task<ServiceResponse<List<ClientDto>>> GetRegisteredClients()
        {
            ServiceResponse<List<ClientDto>> response = new(); 
            try
            {
                var httpContext = _accessor.HttpContext;
                var getUser = httpContext?.User.Identity?.Name;

                var findUser = _userManager.FindByNameAsync(getUser);
                var user = findUser.Result;

                var clients = await _context.Clients.Where(x => x.UserId == user.Id).ToListAsync();

                response.Data = clients.Select(x => _mapper.Map<ClientDto>(x)).ToList();
                response.Message = "Client successfully fetched";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;  
                response.Success = false;
            }

            return response;
        }

        public async Task<ServiceResponse<ClientDto>> RegisterClient(ClientDto clientDto)
        {
            ServiceResponse<ClientDto> response = new(); 
            try
            {
                var httpContext = _accessor.HttpContext;
                var getUser = httpContext?.User.Identity?.Name;

                var findUser = _userManager.FindByNameAsync(getUser);
                var user = findUser.Result;

                var userId = user.Id;

                Client client = _mapper.Map<Client>(clientDto);
                client.UserId = userId;
                _context.Clients.Add(client);
                await _context.SaveChangesAsync();

                //response.Data = 
                response.Message = "Client added successfully";
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Success = false; 
            }

            return response;
        }
    }
}
