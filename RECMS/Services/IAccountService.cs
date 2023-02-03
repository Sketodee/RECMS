namespace RECMS.Services
{
    public interface  IAccountService
    {
        Task<ServiceResponse<UserDto>> Signup (UserDto userDto);
        Task<ServiceResponse<UserDto>> CreateAdmin (UserDto userDto);
        Task<ServiceResponse<LoginCred>> Login(LoginUser login);
    }
}
