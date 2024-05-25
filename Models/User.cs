using Microsoft.Build.Framework;
using Microsoft.AspNetCore.Identity;

namespace PiwKO.Models;

public class User : IdentityUser
{
    public List<UserBeer> UserBeers { get; set; }
    
    public class Role : IdentityRole<int>
    {
    
    }
}

