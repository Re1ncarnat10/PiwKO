using PiwKO.Dtos;
using PiwKO.Interfaces;
using PiwKO.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace PiwKO.Services
{
    public class BeerService : IBeerService
    {
        private readonly AppDbContext _context;

        public BeerService(AppDbContext context)
        {
            _context = context;
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
    }
}