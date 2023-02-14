using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using LousyCards.Models;

namespace LousyCards.Repositories
{
    public interface ICommentRepository
    {
        List<CardComment> GetAll();
        public List<CardComment> GetByCardId(int cardId);
        public List<CardComment> GetLastFiveByUserId(int userId);
        void Add(CardComment comment);
        void Delete(int id);
    }
}