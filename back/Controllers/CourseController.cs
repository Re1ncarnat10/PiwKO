using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PiwKO.Interfaces;

namespace PiwKO.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CourseController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseService.GetAllCoursesAsync();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourseById(int id)
        {
            var course = await _courseService.GetCourseByIdAsync(id);
            return Ok(course);
        }
        [HttpGet("bought")]
        public async Task<IActionResult> GetAllBoughtCourses(string userId)
        {
            var courses = await _courseService.GetAllBoughtCoursesAsync(userId);
            return Ok(courses);
        }

        [HttpGet("bought/{id}")]
        public async Task<IActionResult> GetBoughtCourseById(int id, string userId)
        {
            var course = await _courseService.GetBoughtCourseByIdAsync(userId, id);
            return Ok(course);
        }
        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavoriteCourses(string userId)
        {
            var course = await _courseService.GetFavoriteCoursesAsync(userId);
            return Ok(course);
        }
    }
}