using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PiwKO.Models;

namespace PiwKO.Services
{
    public class UserCourseService : IUserCourseService
    {
        private readonly AppDbContext _context;

        public UserCourseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserCourseDto> AddToFavouritesAsync(string userId, int courseId)
        {
            var userCourse = await _context.UserCourses.FirstOrDefaultAsync(ub => ub.UserId == userId && ub.CourseId == courseId);

            if (userCourse != null)
            {
                
                userCourse.IsFavourite = !userCourse.IsFavourite;
            }
            else
            {
                userCourse = new UserCourse
                {
                    UserId = userId,
                    CourseId = courseId,
                    IsFavourite = true,
                };

                _context.UserCourses.Add(userCourse);
            }

            await _context.SaveChangesAsync();

            return new UserCourseDto
            {
                UserCourseId = userCourse.UserCourseId,
                UserId = userCourse.UserId,
                CourseId = userCourse.CourseId,
                IsFavourite = userCourse.IsFavourite,
            };
        }

        public async Task<UserCourseDto> RateCourseAsync(string userId, int courseId, int score)
        {
            var userCourse = await _context.UserCourses.FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == courseId);

            if (userCourse == null || !userCourse.IsPurchased)
            {
                throw new Exception("Course not purchased");
            }

            userCourse.Score = score;

            await _context.SaveChangesAsync();

            return new UserCourseDto
            {
                UserCourseId = userCourse.UserCourseId,
                UserId = userCourse.UserId,
                CourseId = userCourse.CourseId,
                Score = userCourse.Score
            };
        }
        public async Task<UserCourseDto> PurchaseCourseAsync(string userId, int courseId)
        {
            var user = await _context.Users.FindAsync(userId);
            var course = await _context.Courses.FindAsync(courseId);

            if (user == null || course == null)
            {
                throw new Exception("User or course not found");
            }

            if (user.Wallet < course.Price)
            {
                throw new Exception("Insufficient funds");
            }

            var userCourse = await _context.UserCourses.FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CourseId == courseId);

            if (userCourse != null)
            {
                if (userCourse.IsPurchased)
                {
                    throw new Exception("Course already purchased");
                }

                userCourse.IsPurchased = true;
            }
            else
            {
                userCourse = new UserCourse
                {
                    UserId = userId,
                    CourseId = courseId,
                    IsPurchased = true,
                };

                _context.UserCourses.Add(userCourse);
            }

            user.Wallet -= course.Price;

            await _context.SaveChangesAsync();

            return new UserCourseDto
            {
                UserCourseId = userCourse.UserCourseId,
                UserId = userCourse.UserId,
                CourseId = userCourse.CourseId,
                IsPurchased = userCourse.IsPurchased,
            };
        }
    }
}