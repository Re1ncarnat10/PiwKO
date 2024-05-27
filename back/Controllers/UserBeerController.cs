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
    public class UserBeerController : ControllerBase
    {
        private readonly IUserBeerService _userBeerService;
        private readonly UserManager<User> _userManager;

        public UserBeerController(IUserBeerService userBeerService, UserManager<User> userManager)
        {
            _userBeerService = userBeerService;
            _userManager = userManager;
        }

        [HttpPost("favourites/{beerId}")]
        public async Task<IActionResult> AddToFavourites(int beerId)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var userBeerDto = await _userBeerService.AddToFavouritesAsync(userId, beerId);
            return Ok(userBeerDto);
        }

        [HttpPost("rate/{beerId}")]
        public async Task<IActionResult> RateBeer(int beerId, [FromBody] int score)
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var userBeerDto = await _userBeerService.RateBeerAsync(userId, beerId, score);
            return Ok(userBeerDto);
        }
    }
}