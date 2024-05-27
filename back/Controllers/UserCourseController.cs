using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PiwKO.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using PiwKO.Models;

namespace PiwKO.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserCourseController : ControllerBase
    {
        private readonly IUserCourseService _userCourseService;
        private readonly UserManager<User> _userManager;

        public UserCourseController(IUserCourseService userCourseService, UserManager<User> userManager)
        {
            _userCourseService = userCourseService;
            _userManager = userManager;
        }

        [HttpPost("favourites/{courseId}")]
        public async Task<IActionResult> AddToFavourites(int courseId)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var userCourseDto = await _userCourseService.AddToFavouritesAsync(userId, courseId);
            return Ok(userCourseDto);
        }

        [HttpPost("rate/{courseId}")]
        public async Task<IActionResult> RateCourse(int courseId, [FromBody] int score)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var userCourseDto = await _userCourseService.RateCourseAsync(userId, courseId, score);
            return Ok(userCourseDto);
        }
        [HttpPost("purchase/{courseId}")]
        public async Task<IActionResult> PurchaseCourse(int courseId)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var userCourseDto = await _userCourseService.PurchaseCourseAsync(userId, courseId);
            return Ok(userCourseDto);
        }
    }
}