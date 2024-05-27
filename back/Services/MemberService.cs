using Microsoft.AspNetCore.Identity;
using PiwKO.Models;
using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Exceptions;

namespace PiwKO.Services;

public class MemberService : IMemberService
{
    private readonly UserManager<User> _userManager;

    public MemberService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<MemberDto> GetMemberInfoAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new UserNotFoundException($"User with id {userId} not found");
        }

        return new MemberDto
        {
            Name = user.Name,
            Email = user.Email,
            
        };
    }

    public async Task<IdentityResult> UpdateMemberInfoAsync(string userId, MemberDto memberDto)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new UserNotFoundException("User not found");
        }

        user.Name = memberDto.Name;
        user.Email = memberDto.Email;

        return await _userManager.UpdateAsync(user);
    }
    public async Task AddFundsToWalletAsync(string userId, decimal amount)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        user.Wallet += amount;
        await _userManager.UpdateAsync(user);
    }
}