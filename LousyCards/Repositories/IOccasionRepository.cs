using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using LousyCards.Models;

namespace LousyCards.Repositories
{
    public interface IOccasionRepository
    {
        List<Occasion> GetAllOccasions();
        Occasion GetOccasionById(int id);
    }
}