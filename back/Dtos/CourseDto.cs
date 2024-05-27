namespace PiwKO.Dtos;

public class CourseDto
{
    public int CourseId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Image { get; set; }
    public decimal Price { get; set; }
    public double AverageRating { get; set; }
    public int RatingCount { get; set; }
}