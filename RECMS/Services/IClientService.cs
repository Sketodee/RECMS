namespace RECMS.Services
{
    public interface IClientService
    {
        Task<ServiceResponse<ClientDto>> RegisterClient(ClientDto clientDto);
        Task<ServiceResponse<List<GetClientDto>>> GetRegisteredClients ();
    }
}
