using Microsoft.Build.Framework;
using Microsoft.AspNetCore.Identity;

namespace PiwKO.Models;

public class User : IdentityUser<int>
{
    public List<Piwo> Ulubione { get; set; }
    
    public class Role : IdentityRole<int>
    {
    
    }
}

