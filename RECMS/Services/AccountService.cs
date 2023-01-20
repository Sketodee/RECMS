
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RECMS.Dtos;
using RECMS.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RECMS.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly DataContext _context;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountService(
            UserManager<AppUser> userManager,
            DataContext context,
            RoleManager<IdentityRole> roleManager, 
            SignInManager<AppUser> signInManager,
             IMapper mapper,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _configuration = configuration;
        }


        public async Task<ServiceResponse<UserDto>> Signup(UserDto userDto)
        {
            ServiceResponse<UserDto> response = new();
            try
            {
                var user = _mapper.Map<User>(userDto);
                var appUser = _mapper.Map<AppUser>(user);

                //find if referrer is in the system
                var referrer = await _context.Users.Where(x => x.ReferralId == user.ReferralId).FirstOrDefaultAsync();
                if (referrer != null)
                {
                    IdentityResult result = await _userManager.CreateAsync(appUser, userDto.Password);

                    if (result.Succeeded)
                    {
                        //check if user role already exists
                        if (!await _roleManager.RoleExistsAsync("User"))
                            await _roleManager.CreateAsync(new IdentityRole("User"));

                        if (await _roleManager.RoleExistsAsync("User"))
                        {
                            await _userManager.AddToRoleAsync(appUser, "User");
                        }
                        response.Success = true;
                        response.Message = "User created successfully";
                    }
                    else if (!result.Succeeded)
                    {
                        response.Message = "Can't create user " + result.Errors.FirstOrDefault()?.Description;
                        response.Success = false;
                    }
                    else
                    {
                        response.Success = false;
                        response.Message = "Can't create user";
                    }
                }
                else
                {
                    response.Success = false;
                    response.Message = "Referrer does not exist";
                }
              
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                response.Success = false;
            }

            return response;
        }


        public async Task<ServiceResponse<UserDto>> CreateAdmin(UserDto userDto)
        {
            ServiceResponse<UserDto> response = new();
            try
            {
                var user = _mapper.Map<User>(userDto);
                var appUser = _mapper.Map<AppUser>(user);

                IdentityResult result = await _userManager.CreateAsync(appUser, userDto.Password);

                if(result.Succeeded)
                {
                    //check if user role already exists
                    if (!await _roleManager.RoleExistsAsync("Admin"))
                        await _roleManager.CreateAsync(new IdentityRole("Admin"));

                    if (await _roleManager.RoleExistsAsync("Admin"))
                    {
                        await _userManager.AddToRoleAsync(appUser, "Admin");
                    }

                    response.Success = true;
                    response.Message = "admin created successfully";
                }
               else if (!result.Succeeded)
                {
                    response.Message = "can't create admin " + result.Errors.FirstOrDefault()?.Description;
                    response.Success = false;
                }

                else
                {
                    response.Success = false;
                    response.Message = "Can't create admin";
                }

               
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
