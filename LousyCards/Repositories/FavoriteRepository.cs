using LousyCards.Models;
using LousyCards.Utils;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;


using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
using System;

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
           SELECT f.Id, f.UserId, f.CardId, f.CreatedAt,

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    
             FROM Favorite f
                  JOIN UserProfile uc ON f.UserId = uc.Id
                  JOIN Card c ON c.Id = f.CardId
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
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                CardId = DbUtils.GetInt(reader, "CardId"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
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
           SELECT f.Id, f.UserId, f.CardId, f.CreatedAt,

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    
             FROM Favorite f
                  JOIN UserProfile uc ON f.UserId = uc.Id
                  JOIN Card c ON c.Id = f.CardId
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
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                CardId = DbUtils.GetInt(reader, "CardId"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
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
                    INSERT INTO Favorite (CardId, UserId, CreatedAt)
                    VALUES (@CardId, @UserId, @CreatedAt)


            ";

                    DbUtils.AddParameter(cmd, "@UserId", favorite.UserId);
                    DbUtils.AddParameter(cmd, "@CardId", favorite.CardId);
                    DbUtils.AddParameter(cmd, "@CreatedAt", favorite.CreatedAt);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int cardId, int userId)
        {
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                DELETE FROM Favorite
                WHERE CardId = @cardId AND UserId = @userId";

                        cmd.Parameters.AddWithValue("@cardId", cardId);
                        cmd.Parameters.AddWithValue("@userId", userId);

                        int rowsDeleted = cmd.ExecuteNonQuery();

                        if (rowsDeleted == 0)
                        {
                            throw new Exception("No favorite found to delete");
                        }
                    }
                }
            }
        }


    }
}
