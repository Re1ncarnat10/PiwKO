using PiwKO.Dtos;
using System.Threading.Tasks;

namespace PiwKO.Interfaces
{
    public interface IUserCourseService
    {
        Task<UserCourseDto> AddToFavouritesAsync(string userId, int courseId);
        Task<UserCourseDto> RateCourseAsync(string userId, int courseId, int score);
        Task<UserCourseDto> PurchaseCourseAsync(string userId, int courseId);
    }
}