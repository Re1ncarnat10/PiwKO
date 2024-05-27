using System.ComponentModel.DataAnnotations;

namespace PiwKO.Dtos
{
    public class MemberDto
    {
        [Required(ErrorMessage = "Name is required")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters long")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email format")]
        public string Email { get; set; }
        
    }
}