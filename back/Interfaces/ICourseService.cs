using PiwKO.Dtos;
namespace PiwKO.Interfaces;

public interface ICourseService
{
    Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
    Task<CourseDto> GetCourseByIdAsync(int id);
    Task<IEnumerable<BoughtCourseDto>> GetAllBoughtCoursesAsync(string userId);
    Task<BoughtCourseDto> GetBoughtCourseByIdAsync(string userId, int courseId);
    Task<IEnumerable<CourseDto>> GetFavoriteCoursesAsync(string userId);
}