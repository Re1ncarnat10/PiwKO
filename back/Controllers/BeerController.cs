using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PiwKO.Interfaces;

namespace PiwKO.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BeerController : ControllerBase
    {
        private readonly IBeerService _beerService;

        public BeerController(IBeerService beerService)
        {
            _beerService = beerService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBeers()
        {
            var beers = await _beerService.GetAllBeersAsync();
            return Ok(beers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBeerById(int id)
        {
            var beer = await _beerService.GetBeerByIdAsync(id);
            return Ok(beer);
        }
    }
}