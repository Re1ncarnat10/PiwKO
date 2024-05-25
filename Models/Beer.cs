using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PiwKO.Models
{
    public class Beer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BeerId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Producer { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        [Required]
        public double Alcohol { get; set; }
        public double Price { get; set; }
        public List<UserBeer> UserBeers { get; set; }
    }
}