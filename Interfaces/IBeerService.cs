using PiwKO.Dtos;
namespace PiwKO.Interfaces;

public interface IBeerService
{
    Task<IEnumerable<BeerDto>> GetAllBeersAsync();
    Task<BeerDto> GetBeerByIdAsync(int id);
}