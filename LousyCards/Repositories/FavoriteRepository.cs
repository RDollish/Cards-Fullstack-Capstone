using LousyCards.Models;
using LousyCards.Utils;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;


using Microsoft.Extensions.Configuration;

namespace LousyCards.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }
        public List<CardFavorite> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
           SELECT f.Id, f.CreatedAt,

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    
             FROM Favorite f
                  JOIN UserProfile uc ON f.UserId = uc.Id
                  JOIN Card c ON c.CardId = f.Id
            WHERE c.CreatedAt <= SYSDATETIME()
         ORDER BY c.CreatedAt DESC
        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var favorites = new List<CardFavorite>();
                        while (reader.Read())
                        {
                            favorites.Add(new CardFavorite()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                                Card = new Card()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                    OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                }
                            });
                        }

                        return favorites;
                    }
                }
            }
        }
        public List<CardFavorite> GetByCardId(int cardId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
           SELECT f.Id, f.CreatedAt,

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    
             FROM Favorite f
                  JOIN UserProfile uc ON f.UserId = uc.Id
                  JOIN Card c ON c.CardId = f.Id
            WHERE c.CreatedAt <= SYSDATETIME()
         ORDER BY c.CreatedAt DESC
        ";

                    cmd.Parameters.AddWithValue("@cardId", cardId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var favorites = new List<CardFavorite>();
                        while (reader.Read())
                        {
                            favorites.Add(new CardFavorite()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                                Card = new Card()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                    OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                }
                            });
                        }

                        return favorites;
                    }
                }
            }
        }
        public void Add(CardFavorite favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Favorite (CardId, UserId)
                VALUES (@Comment, @CardId, @UserId)
            ";

                    cmd.Parameters.AddWithValue("@CardId", favorite.Card.Id);
                    cmd.Parameters.AddWithValue("@UserId", favorite.UserProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
