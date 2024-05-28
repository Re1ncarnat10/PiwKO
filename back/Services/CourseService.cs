using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PiwKO.Services
{
    public class CourseService : ICourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
        {
            return await _context.Courses
                .Select(c => new CourseDto
                {
                    CourseId = c.CourseId,
                    Name = c.Name,
                    Description = c.Description,
                    Image = c.Image,
                    Price = c.Price,
                    AverageRating = c.UserCourses.Where(uc => uc.Score.HasValue).Average(uc => uc.Score.Value),
                    RatingCount = c.UserCourses.Count(uc => uc.Score.HasValue)
                })
                .ToListAsync();
        }

        public async Task<CourseDto> GetCourseByIdAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);

            if (course == null)
            {
                return null;
            }

            return new CourseDto
            {
                CourseId = course.CourseId,
                Name = course.Name,
                Description = course.Description,
                Image = course.Image,
                Price = course.Price,
                AverageRating = course.UserCourses.Where(uc => uc.Score.HasValue).Average(uc => uc.Score.Value),
                RatingCount = course.UserCourses.Count(uc => uc.Score.HasValue)
            };
        }
        public async Task<IEnumerable<BoughtCourseDto>> GetAllBoughtCoursesAsync(string userId)
        {
            var boughtCourses = await _context.UserCourses
                .Where(uc => uc.UserId == userId && uc.IsPurchased)
                .Select(uc => new BoughtCourseDto
                {
                    CourseId = uc.Course.CourseId,
                    Name = uc.Course.Name,
                    Description = uc.Course.Description,
                    Image = uc.Course.Image,
                    Price = uc.Course.Price,
                    Content = uc.Course.Content,
                    AverageRating = uc.Course.UserCourses.Where(uc => uc.Score.HasValue).Average(uc => uc.Score.Value),
                    RatingCount = uc.Course.UserCourses.Count(uc => uc.Score.HasValue)
                })
                .ToListAsync();

            return boughtCourses;
        }

        public async Task<BoughtCourseDto> GetBoughtCourseByIdAsync(string userId, int courseId)
        {
            var userCourse = await _context.UserCourses
                .Where(uc => uc.UserId == userId && uc.CourseId == courseId && uc.IsPurchased)
                .Select(uc => new BoughtCourseDto
                {
                    CourseId = uc.Course.CourseId,
                    Name = uc.Course.Name,
                    Description = uc.Course.Description,
                    Image = uc.Course.Image,
                    Price = uc.Course.Price,
                    Content = uc.Course.Content,
                    AverageRating = uc.Course.UserCourses.Where(uc => uc.Score.HasValue).Average(uc => uc.Score.Value),
                    RatingCount = uc.Course.UserCourses.Count(uc => uc.Score.HasValue)
                })
                .FirstOrDefaultAsync();

            return userCourse;
        }
        public async Task<IEnumerable<CourseDto>> GetFavoriteCoursesAsync(string userId)
        {
            var favouriteCourses = await _context.UserCourses
                .Where(uc => uc.UserId == userId && uc.IsFavourite)
                .Select(uc => new CourseDto
                {
                    CourseId = uc.Course.CourseId,
                    Name = uc.Course.Name,
                    Description = uc.Course.Description,
                    Image = uc.Course.Image,
                    Price = uc.Course.Price,
                    AverageRating = uc.Course.UserCourses.Where(uc => uc.Score.HasValue).Average(uc => uc.Score.Value),
                    RatingCount = uc.Course.UserCourses.Count(uc => uc.Score.HasValue)
                })
                .ToListAsync();

            return favouriteCourses;
        }
    }
}