namespace PiwKO.Dtos;

public class UserCourseDto
{
    public int UserCourseId { get; set; }
    public string UserId { get; set; }
    public int CourseId { get; set; }
    public bool IsFavourite { get; set; }
    public bool IsPurchased { get; set; }
    public int? Score { get; set; }
}