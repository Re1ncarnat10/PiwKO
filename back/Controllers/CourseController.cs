using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PiwKO.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using PiwKO.Models;

namespace PiwKO.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly ICourseService _courseService;

        public CourseController(UserManager<User> userManager, ICourseService courseService)
        {
            _userManager = userManager;
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
        [Authorize]
        [HttpGet("bought")]
        public async Task<IActionResult> GetAllBoughtCourses()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var courses = await _courseService.GetAllBoughtCoursesAsync(userId);
            return Ok(courses);
        }
        [Authorize]
        [HttpGet("bought/{id}")]
        public async Task<IActionResult> GetBoughtCourseById(int id)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var course = await _courseService.GetBoughtCourseByIdAsync(userId, id);
            return Ok(course);
        }
        [Authorize]
        [HttpGet("favorites")]
        public async Task<IActionResult> GetFavoriteCourses()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var courses = await _courseService.GetFavoriteCoursesAsync(userId);
            return Ok(courses);
        }
    }
}