﻿using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace RECMS.Models
{
    public class AppUser : IdentityUser
    {
        //public string FullName { get; set; } = string.Empty;
        public string AccountDetails { get; set; } = string.Empty;
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Link { get; set; }
    }
}
