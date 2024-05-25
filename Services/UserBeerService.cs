using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PiwKO.Models;

namespace PiwKO.Services
{
    public class UserBeerService : IUserBeerService
    {
        private readonly AppDbContext _context;

        public UserBeerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<UserBeerDto> AddToFavouritesAsync(string userId, int beerId)
        {
            var userBeer = await _context.UserBeers.FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BeerId == beerId);

            if (userBeer != null)
            {
                if (userBeer.IsFavourite)
                {
                    throw new Exception("Beer is already in favourites");
                }

                userBeer.IsFavourite = true;
            }
            else
            {
                userBeer = new UserBeer
                {
                    UserId = userId,
                    BeerId = beerId,
                    IsFavourite = true,
                    Score = 0
                };

                _context.UserBeers.Add(userBeer);
            }

            await _context.SaveChangesAsync();

            return new UserBeerDto
            {
                UserBeerId = userBeer.UserBeerId,
                UserId = userBeer.UserId,
                BeerId = userBeer.BeerId,
                IsFavourite = userBeer.IsFavourite,
                Score = userBeer.Score
            };
        }

        public async Task<UserBeerDto> RateBeerAsync(string userId, int beerId, int score)
        {
            var userBeer = await _context.UserBeers.FirstOrDefaultAsync(ub => ub.UserId == userId && ub.BeerId == beerId);

            if (userBeer != null)
            {
                userBeer.Score = score;
            }
            else
            {
                userBeer = new UserBeer
                {
                    UserId = userId,
                    BeerId = beerId,
                    IsFavourite = false,
                    Score = score
                };

                _context.UserBeers.Add(userBeer);
            }

            await _context.SaveChangesAsync();

            return new UserBeerDto
            {
                UserBeerId = userBeer.UserBeerId,
                UserId = userBeer.UserId,
                BeerId = userBeer.BeerId,
                IsFavourite = userBeer.IsFavourite,
                Score = userBeer.Score
            };
        }
    }
}