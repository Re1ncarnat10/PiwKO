using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Models;

namespace PiwKO.Controllers
{
    [Authorize]
    [ApiController]
    [Route("my-account")]
    public class MemberController : ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly UserManager<User> _userManager;

        public MemberController(IMemberService memberService, UserManager<User> userManager)
        {
            _memberService = memberService;
            _userManager = userManager;
        }
        

        [HttpGet]
        public async Task<IActionResult> GetMyAccount()
        {
            var userId = _userManager.GetUserId(User);
            if (userId == null)
            {
                return Unauthorized("User is not logged in");
            }
            var memberDto = await _memberService.GetMemberInfoAsync(userId);
            return Ok(memberDto);
            
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdateMyAccount([FromBody] MemberDto memberDto)
        {
           if (!ModelState.IsValid)
           {
               return BadRequest(ModelState);
           }
           var userId = _userManager.GetUserId(User);
           if (userId == null)
           {
               return Unauthorized("User is not logged in");
           }
           var result = await _memberService.UpdateMemberInfoAsync(userId, memberDto);
           if (result.Succeeded)
           {
               return Ok("Member info updated");
           }
           return BadRequest(result.Errors);
        }
    }
}