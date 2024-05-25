using Microsoft.AspNetCore.Identity;
using PiwKO.Dtos;

namespace PiwKO.Interfaces;

    public interface IMemberService
    {
        Task<MemberDto> GetMemberInfoAsync(string userId);
        Task<IdentityResult> UpdateMemberInfoAsync(string userId, MemberDto memberDto);
    }