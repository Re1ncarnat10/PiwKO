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

    [HttpPost("courses")]
    public async Task<IActionResult> CreateCourse(BoughtCourseDto courseDto)
    {
        var createdCourse = await _adminService.CreateCourseAsync(courseDto);
        return Ok(createdCourse);
    }

    [HttpGet("courses")]
    public async Task<IActionResult> GetAllCourses()
    {
        var courses = await _adminService.GetAllCoursesAsync();
        return Ok(courses);
    }

    [HttpGet("courses/{id}")]
    public async Task<IActionResult> GetCourseById(int id)
    {
        var course = await _adminService.GetCourseByIdAsync(id);
        return Ok(course);
    }

    [HttpPut("courses/{id}")]
    public async Task<IActionResult> UpdateCourse(int id, BoughtCourseDto courseDto)
    {
        await _adminService.UpdateCourseAsync(id, courseDto);
        return Ok();
    }

    [HttpDelete("courses/{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
        await _adminService.DeleteCourseAsync(id);
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
    [HttpPut("users/{userId}/wallet")]
    public async Task<IActionResult> UpdateUserWallet(string userId, decimal newBalance)
    {
        await _adminService.UpdateUserWalletAsync(userId, newBalance);
        return Ok();
    }

    [HttpPost("initialize")]
    public async Task<IActionResult> InitializeAdmin()
    {
        await _adminService.InitializeAdminAsync();
        return Ok();
    }
}