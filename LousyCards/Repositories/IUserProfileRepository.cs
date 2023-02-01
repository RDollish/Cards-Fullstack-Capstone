using LousyCards.Models;
using System.Collections.Generic;

namespace LousyCards.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetAll();
    }
}
