using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using LousyCards.Models;

namespace LousyCards.Repositories
{
    public interface ICardRepository
    {
        List<Card> GetAll();
        Card GetById(int id);
        List<Card> GetByUserId(string firebaseId);
        void Add(Card card);
        void Edit(int id, Card card);
        void Delete(int id);
    }
}