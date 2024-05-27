using System.Collections.Generic;
using System.Threading.Tasks;
using PiwKO.Dtos;
using Microsoft.AspNetCore.Identity;

namespace PiwKO.Interfaces
{
    public interface IAdminService
    {
        Task<CourseDto> CreateCourseAsync(BoughtCourseDto courseDto);
        Task<IEnumerable<CourseDto>> GetAllCoursesAsync();
        Task<CourseDto> GetCourseByIdAsync(int id);
        Task UpdateCourseAsync(int id, BoughtCourseDto courseDto);
        Task DeleteCourseAsync(int id);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<IdentityResult> DeleteUserAsync(string userId);
        Task UpdateUserWalletAsync(string userId, decimal newBalance);
        Task InitializeAdminAsync();
    }
}