using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace RECMS.Models
{
    public class AppUser : IdentityUser
    {
        public string Surname { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string AccountDetails { get; set; } = string.Empty;
        public string BankProvider { get; set; } = string.Empty;
        public string AccountName { get; set; } = string.Empty;
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Link { get; set; }
        public int ReferrerId { get; set; }
        public string PhoneNumber { get; set; }
    }
}
