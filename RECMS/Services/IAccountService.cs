namespace RECMS.Services
{
    public interface  IAccountService
    {
        Task<ServiceResponse<User>> Signup (User user);
        Task<ServiceResponse<User>> CreateAdmin (User user);
        Task<ServiceResponse<LoginCred>> Login(LoginUser login);
    }
}
