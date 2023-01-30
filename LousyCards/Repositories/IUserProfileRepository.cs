using LousyCards.Models;
using System.Collections.Generic;

namespace LousyCards.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetById(int id);
        List<UserProfile> GetAll();
    }
}
