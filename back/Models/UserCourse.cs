using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PiwKO.Models
{
    public class UserCourse
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserCourseId { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [Required]
        public int CourseId { get; set; }

        [ForeignKey("CourseId")]
        public virtual Course? Course { get; set; }

        public bool IsFavourite { get; set; }
        public bool IsPurchased { get; set; }
        [Range(0, 10)]
        public int? Score { get; set; }

        public UserCourse(string userId, int courseId, bool isPurchased, bool isFavourite, int score)
        {
            UserId = userId;
            CourseId = courseId;
            IsPurchased = isPurchased;
            IsFavourite = isFavourite;
            Score = score;
        }

        public UserCourse()
        {
        }
    }
}