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
    public async Task<BeerDto> CreateBeerAsync(BeerDto beerDto)
    {
        _logger.LogInformation("Tworzenie nowego piwa {Name}", beerDto.Name);
        try
        {
            var beer = new Beer
            {
                Name = beerDto.Name,
                Producer = beerDto.Producer,
                Description = beerDto.Description,
                Image = beerDto.Image,
                Alcohol = beerDto.Alcohol,
                Price = beerDto.Price
            };

            _context.Beers.Add(beer);
            await _context.SaveChangesAsync();

            // Zaktualizuj beerDto z nowym ID i zwróć
            beerDto.BeerId = beer.BeerId;
            _logger.LogInformation("Piwo {Name} zostało pomyślnie utworzone", beerDto.Name);
            return beerDto;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Wystąpił błąd podczas tworzenia piwa {Name}", beerDto.Name);
            throw;
        }
    }

    public async Task<IEnumerable<BeerDto>> GetAllBeersAsync()
    {
        return await _context.Beers
            .Select(b => new BeerDto
            {
                BeerId = b.BeerId,
                Name = b.Name,
                Producer = b.Producer,
                Description = b.Description,
                Image = b.Image,
                Alcohol = b.Alcohol,
                Price = b.Price
            })
            .ToListAsync();
    }

    public async Task<BeerDto> GetBeerByIdAsync(int id)
    {
        var beer = await _context.Beers.FindAsync(id);

        if (beer == null)
        {
            return null;
        }

        return new BeerDto
        {
            BeerId = beer.BeerId,
            Name = beer.Name,
            Producer = beer.Producer,
            Description = beer.Description,
            Image = beer.Image,
            Alcohol = beer.Alcohol,
            Price = beer.Price
        };
    }

    public async Task UpdateBeerAsync(int id, BeerDto beerDto)
    {
        var beer = await _context.Beers.FindAsync(id);

        if (beer == null)
        {
            return;
        }

        beer.Name = beerDto.Name;
        beer.Producer = beerDto.Producer;
        beer.Description = beerDto.Description;
        beer.Image = beerDto.Image;
        beer.Alcohol = beerDto.Alcohol;
        beer.Price = beerDto.Price;

        await _context.SaveChangesAsync();
    }

    public async Task DeleteBeerAsync(int id)
    {
        var beer = await _context.Beers.FindAsync(id);

        if (beer == null)
        {
            return;
        }

        _context.Beers.Remove(beer);
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