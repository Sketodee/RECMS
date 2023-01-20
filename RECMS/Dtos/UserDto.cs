using System.ComponentModel.DataAnnotations;

namespace RECMS.Dtos
{
    public class UserDto
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
        //public string FullName { get; set; } = string.Empty;
        public string AccountDetails { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public int ReferralId { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
