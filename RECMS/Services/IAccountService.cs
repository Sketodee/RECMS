namespace RECMS.Services
{
    public interface  IAccountService
    {
        Task<ServiceResponse<UserDto>> Signup (UserDto userDto);
        Task<ServiceResponse<User>> CreateAdmin (User user);
        Task<ServiceResponse<LoginCred>> Login(LoginUser login);
    }
}
