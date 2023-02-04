using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using LousyCards.Models;

namespace LousyCards.Repositories
{
    public interface IFavoriteRepository
    {
        List<CardFavorite> GetAll();
        public List<CardFavorite> GetByCardId(int cardId);
        void Add(CardFavorite favorite);
        void Delete(int cardId, int userId);
    }
}