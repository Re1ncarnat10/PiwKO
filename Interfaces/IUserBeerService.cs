using PiwKO.Dtos;
using System.Threading.Tasks;

namespace PiwKO.Interfaces
{
    public interface IUserBeerService
    {
        Task<UserBeerDto> AddToFavouritesAsync(string userId, int beerId);
        Task<UserBeerDto> RateBeerAsync(string userId, int beerId, int score);
    }
}