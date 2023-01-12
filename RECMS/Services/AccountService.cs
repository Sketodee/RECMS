
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using RECMS.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RECMS.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<AppUser> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }


        public async Task<ServiceResponse<User>> Signup(User user)
        {
            ServiceResponse<User> response = new();
            try
            {
                AppUser appUser = new AppUser
                {
                    UserName = user.Email,
                    Email = user.Email,
                    //FullName = user.FullName,
                    AccountDetails = user.AccountDetails,
                };

                IdentityResult result = await _userManager.CreateAsync(appUser, user.Password);

                //check if user role already exists
                if (!await _roleManager.RoleExistsAsync("User"))
                    await _roleManager.CreateAsync(new IdentityRole("User"));

                if (await _roleManager.RoleExistsAsync("User"))
                {
                    await _userManager.AddToRoleAsync(appUser, "User");
                }

                if (!result.Succeeded)
                {
                    response.Message = "can't create user " + result.Errors.FirstOrDefault()?.Description;
                    response.Success = false;
                    return response;
                }

                response.Success = true;
                response.Message = "user created successfully";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Success = false;
            }

            return response;
        }


        public async Task<ServiceResponse<LoginCred>> Login(LoginUser login)
        {
            ServiceResponse<LoginCred> response = new(); 
            try
            {
                AppUser appUser = await _userManager.FindByEmailAsync(login.Email);
                if (appUser != null && await _userManager.CheckPasswordAsync(appUser, login.Password))
                {
                    var userRoles = await _userManager.GetRolesAsync(appUser);

                    var authClaims = new List<Claim>
                            {
                                new Claim(ClaimTypes.Name, appUser.UserName),
                                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                            };

                    foreach (var userRole in userRoles)
                    {
                        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                    }

                    var token = GetToken(authClaims);

                    var returnedToken = new JwtSecurityTokenHandler().WriteToken(token);

                    var userDetails = new LoginCred
                    {
                        role = userRoles[0],
                        email = appUser.Email,
                        id = appUser.Id,
                        token = returnedToken,
                    };

                    response.Data = userDetails;
                    response.Success = true;
                }
                else
                {
                    response.Message = "invalid credentials";
                    response.Success = false;
                }
            }
            catch (Exception ex)    
            {
                response.Message = ex.Message; 
                response.Success = false;
            }
            return response;    
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(12),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

    }
}
