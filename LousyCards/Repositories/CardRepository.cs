using LousyCards.Models;
using LousyCards.Utils;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;


namespace LousyCards.Repositories
{

    public class CardRepository : BaseRepository, ICardRepository
    {
        public CardRepository(IConfiguration configuration) : base(configuration) { }

        public List<Card> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId

                      uc.FireBaseUserId, uc.UserName, uc.Email, uc.CreateDateTime AS UserProfileDateCreated
                        
                 FROM Card c
                      JOIN UserProfile uc ON p.UserId = uc.Id
                WHERE CreatedAt <= SYSDATETIME()
             ORDER BY CreatedAt DESC
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var posts = new List<Card>();
                        while (reader.Read())
                        {
                            posts.Add(new Card()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                Description = DbUtils.GetString(reader, "Description"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt")
                                },
                            });
                        }

                        return posts;
                    }
                }
            }
        }

        public Card GetById(int id)
        {

            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            
            SELECT c.Title, c.ImageUrl, c.CreatedAt, 
                      c.Description, c.OccasionId c.UserId

                      uc.FireBaseUserId, uc.UserName, uc.Email, uc.CreateDateTime AS UserProfileDateCreated
            FROM Card c
                      JOIN UserProfile up ON c.UserId = uc.Id
                WHERE c.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Card card = null;
                        if (reader.Read())
                        {
                            card = new Card()
                            {
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Content"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt")
                                },
                            };
                        }
                        return card;
                    }
                }
            }
        }

        public List<Card> GetByUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT c.Id, c.Title, c.Description, c.ImageUrl, c.CreatedAt, c.OccasionId
                       p.UserId,

                      uc.FireBaseUserId, uc.UserName, uc.Email, uc.CreateDateTime AS UserProfileDateCreated
                        
                 FROM Card c
                      JOIN UserProfile up ON c.UserId = uc.Id
                WHERE uc.FireBaseUserId = @firebaseUserId
             ORDER BY CreatedAt DESC
            ";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var cards = new List<Card>();
                        while (reader.Read())
                        {
                            cards.Add(new Card()
                            {
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt")
                                },
                            });
                        }

                        return cards;
                    }
                }
            }
        }

        public void Add(Card card)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Post (
                        Title,
                        Description,
                        ImageUrl,
                        CreatedAt,
                        OccasionId,
                        UserId
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @Title,
                        @Description,
                        @ImageUrl,
                        @CreatedAt,
                        @OccasionId,
                        @UserId)
                    ";

                    DbUtils.AddParameter(cmd, "@Title", card.Title);
                    DbUtils.AddParameter(cmd, "@Description", card.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", card.ImageUrl);
                    DbUtils.AddParameter(cmd, "@CreatedAt", card.CreatedAt);
                    DbUtils.AddParameter(cmd, "@OccasionId", card.OccasionId);
                    DbUtils.AddParameter(cmd, "@UserId", card.UserId);

                    card.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}

