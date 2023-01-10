using Microsoft.AspNetCore.Identity;

namespace RECMS.Models
{
    public class AppUser : IdentityUser
    {
        //public string FullName { get; set; } = string.Empty;
        public string AccountDetails { get; set; } = string.Empty; 
    }
}
