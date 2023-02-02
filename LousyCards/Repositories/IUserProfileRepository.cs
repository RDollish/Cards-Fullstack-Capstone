using LousyCards.Models;
using System.Collections.Generic;

namespace LousyCards.Repositories
{
    public interface IUserProfileRepository
    {
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<UserProfile> GetUsers();
        UserProfile GetById(int id);
        void Add(UserProfile userProfile);
    }
}
