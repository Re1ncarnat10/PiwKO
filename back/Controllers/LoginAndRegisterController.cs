using PiwKO.Dtos;
using PiwKO.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PiwKO.Controllers;


[ApiController]
public class LoginAndRegisterController : ControllerBase
{
    private readonly ILoginAndRegisterService _loginAndRegisterService;
    
    public LoginAndRegisterController(ILoginAndRegisterService loginAndRegisterService)
    {
        _loginAndRegisterService = loginAndRegisterService;
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody]RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var result = await _loginAndRegisterService.RegisterUserAsync(registerDto);
        if (result.Succeeded)
        {
            return Ok(new { message = "User registered successfully" });
        }
        return BadRequest(result.Errors);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var tokenDto = await _loginAndRegisterService.LoginUserAsync(model);
            return Ok(tokenDto);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(ex.Message);
        }
    }
}