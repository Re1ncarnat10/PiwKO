using Microsoft.AspNetCore.Identity;
using PiwKO.Models;
using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Exceptions;
using Microsoft.EntityFrameworkCore;
using PiwKO.Data;
using System.Collections.Generic;


public class AdminService : IAdminService
{
    private readonly UserManager<User> _userManager;
    private readonly AppDbContext _context;
    private readonly ILogger<AdminService> _logger;

    public AdminService(UserManager<User> userManager, AppDbContext context, ILogger<AdminService> logger)
    {
        _userManager = userManager;
        _context = context;
        _logger = logger;
    }
    public async Task<CourseDto> CreateCourseAsync(BoughtCourseDto courseDto)
    {
        _logger.LogInformation("Tworzenie nowego kursu {Name}", courseDto.Name);
        try
        {
            var course = new Course
            {
                Name = courseDto.Name,
                Description = courseDto.Description,
                Image = courseDto.Image,
                Price = courseDto.Price,
                Content = courseDto.Content,
            };

            _context.Courses.Add(course);
            await _context.SaveChangesAsync();

            
            courseDto.CourseId = course.CourseId;
            _logger.LogInformation("Kurs {Name} zostało pomyślnie utworzony", courseDto.Name);
            return courseDto;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas tworzenia kursu {Name}", courseDto.Name);
            throw;
        }
    }

    public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
    {
        return await _context.Courses
            .Select(c => new BoughtCourseDto
            {
                CourseId = c.CourseId,
                Name = c.Name,
                Description = c.Description,
                Image = c.Image,
                Price = c.Price,
                Content = c.Content,
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

        return new BoughtCourseDto
        {
            CourseId = course.CourseId,
            Name = course.Name,
            Description = course.Description,
            Image = course.Image,
            Price = course.Price,
            Content = course.Content,
            AverageRating = course.UserCourses.Where(uc => uc.Score.HasValue).Average(uc => uc.Score.Value),
            RatingCount = course.UserCourses.Count(uc => uc.Score.HasValue)
        };
    }

    public async Task UpdateCourseAsync(int id, BoughtCourseDto courseDto)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
        {
            return;
        }

        course.Name = courseDto.Name;
        course.Description = courseDto.Description;
        course.Image = courseDto.Image;
        course.Price = courseDto.Price;
        course.Content = courseDto.Content;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteCourseAsync(int id)
    {
        var course = await _context.Courses.FindAsync(id);

        if (course == null)
        {
            return;
        }

        _context.Courses.Remove(course);
        await _context.SaveChangesAsync();
    }
    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        var users = await _userManager.Users.ToListAsync();
        var userDtos = new List<UserDto>();

        foreach (var user in users)
        {
            var userRoles = await _userManager.GetRolesAsync(user);
            userDtos.Add(new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Wallet = user.Wallet,
                Roles = userRoles.ToList()
            });
        }

        return userDtos;
    }

    public async Task<IdentityResult> DeleteUserAsync(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new UserNotFoundException($"User with ID {userId} not found.");
        }

        return await _userManager.DeleteAsync(user);
    }
    public async Task UpdateUserWalletAsync(string userId, decimal newBalance)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user == null)
        {
            throw new Exception("User not found");
        }

        user.Wallet = newBalance;
        await _userManager.UpdateAsync(user);
    }

    public async Task InitializeAdminAsync()
    {
        const string adminEmail = "admin@gmail.com";
        var adminUser = await _userManager.FindByEmailAsync(adminEmail);

        if (adminUser != null)
        {
            return;
        }

        adminUser = new User
        {
            UserName = adminEmail,
            Email = adminEmail,
            Name = "admin",
            Wallet = 1000000,
        };

        var createUserResult = await _userManager.CreateAsync(adminUser, "Admin123!");
        if (!createUserResult.Succeeded)
        {
            return;
        }

        await _userManager.AddToRoleAsync(adminUser, "Admin");
        await _userManager.AddToRoleAsync(adminUser, "Member");
    }
}