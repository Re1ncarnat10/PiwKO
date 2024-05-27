using Microsoft.AspNetCore.Identity;
using PiwKO.Dtos;

namespace PiwKO.Interfaces;

public interface ILoginAndRegisterService
{
    Task CreateRoles();
    Task<IdentityResult> RegisterUserAsync(RegisterDto registerDto);
    Task<TokenDto> LoginUserAsync(LoginDto loginDto);
    
}