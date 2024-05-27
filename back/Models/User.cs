using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PiwKO.Models
{
    public class User : IdentityUser
    {
        [StringLength(30, ErrorMessage = "Name length can't be more than 30.")]
        public string Name { get; set; }
        public decimal Wallet { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }

        public User(string name)
        {
            Name = name;
        }

        public User()
        {
        }

    }
}

