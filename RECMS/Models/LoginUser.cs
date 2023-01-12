using System.ComponentModel.DataAnnotations;

namespace RECMS.Models
{
    public class LoginUser
    {
        [Required(ErrorMessage = "User Name is required")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string? Password { get; set; }
    }
}
