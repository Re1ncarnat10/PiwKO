using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using PiwKO.Services;
using PiwKO.Dtos;
using PiwKO.Interfaces;
using Microsoft.AspNetCore.Identity;

[Authorize(Roles = "Admin")]
[ApiController]
[Route("admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("beers")]
    public async Task<IActionResult> CreateBeer(BeerDto beerDto)
    {
        var createdBeer = await _adminService.CreateBeerAsync(beerDto);
        return Ok(createdBeer);
    }

    [HttpGet("beers")]
    public async Task<IActionResult> GetAllBeers()
    {
        var beers = await _adminService.GetAllBeersAsync();
        return Ok(beers);
    }

    [HttpGet("beers/{id}")]
    public async Task<IActionResult> GetBeerById(int id)
    {
        var beer = await _adminService.GetBeerByIdAsync(id);
        return Ok(beer);
    }

    [HttpPut("beers/{id}")]
    public async Task<IActionResult> UpdateBeer(int id, BeerDto beerDto)
    {
        await _adminService.UpdateBeerAsync(id, beerDto);
        return Ok();
    }

    [HttpDelete("beers/{id}")]
    public async Task<IActionResult> DeleteBeer(int id)
    {
        await _adminService.DeleteBeerAsync(id);
        return Ok();
    }

    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _adminService.GetAllUsersAsync();
        return Ok(users);
    }

    [HttpDelete("users/{userId}")]
    public async Task<IActionResult> DeleteUser(string userId)
    {
        var result = await _adminService.DeleteUserAsync(userId);
        if (result.Succeeded)
        {
            return Ok();
        }

        return BadRequest(result.Errors);
    }

    [HttpPost("initialize")]
    public async Task<IActionResult> InitializeAdmin()
    {
        await _adminService.InitializeAdminAsync();
        return Ok();
    }
}