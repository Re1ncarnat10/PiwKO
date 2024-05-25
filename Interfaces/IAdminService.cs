using System.Collections.Generic;
using System.Threading.Tasks;
using PiwKO.Dtos;
using Microsoft.AspNetCore.Identity;

namespace PiwKO.Interfaces
{
    public interface IAdminService
    {
        Task<BeerDto> CreateBeerAsync(BeerDto beerDto);
        Task<IEnumerable<BeerDto>> GetAllBeersAsync();
        Task<BeerDto> GetBeerByIdAsync(int id);
        Task UpdateBeerAsync(int id, BeerDto beerDto);
        Task DeleteBeerAsync(int id);
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<IdentityResult> DeleteUserAsync(string userId);
        Task InitializeAdminAsync();
    }
}