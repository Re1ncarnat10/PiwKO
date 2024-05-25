using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PiwKO.Models
{
    public class UserBeer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserBeerId { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [Required]
        public int BeerId { get; set; }

        [ForeignKey("BeerId")]
        public virtual Beer Beer { get; set; }

        public bool IsFavourite { get; set; }
        public int Score { get; set; }

        public UserBeer(string userId, int beerId, bool isFavourite, int score)
        {
            UserId = userId;
            BeerId = beerId;
            IsFavourite = isFavourite;
            Score = score;
        }

        public UserBeer()
        {
        }
    }
}