using System.ComponentModel.DataAnnotations;
namespace PiwKO.Dtos;

public class LoginDto
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    [MinLength(6)]
    public string Password { get; set; }
}