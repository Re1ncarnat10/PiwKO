using System.ComponentModel.DataAnnotations;

namespace PiwKO.Dtos;

public class RegisterDto
{
    [Required]
    [MinLength(3)]
    public string Name { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    [MinLength(6), MaxLength(30)]
    [DataType(DataType.Password)]
    public string Password { get; set; }
    [Required]
    [DataType(DataType.Password)]
    [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; }
}