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
           SELECT c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails,

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  o.Id, o.Name
                    
             FROM Card c
                  JOIN UserProfile uc ON c.UserId = uc.Id
                  JOIN Occasion o ON c.OccasionId = o.Id
            WHERE c.CreatedAt <= SYSDATETIME()
         ORDER BY c.CreatedAt DESC
        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var cards = new List<Card>();
                        while (reader.Read())
                        {
                            cards.Add(new Card()
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
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                                Occasion = new Occasion()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                },
                                CardDetails = DbUtils.GetString(reader, "CardDetails")
                            });
                        }

                        return cards;
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
                  c.Description, c.OccasionId, c.UserId, c.CardDetails,
                  up.FireBaseUserId, up.DisplayName, up.Email, up.CreatedAt AS UserCreatedAt,
                  o.Id, o.Name
        FROM Card c
                  JOIN UserProfile up ON c.UserId = up.Id
                  JOIN Occasion o ON c.OccasionId = o.Id
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
                                Description = DbUtils.GetString(reader, "Description"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                                Occasion = new Occasion()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                },
                                CardDetails = DbUtils.GetString(reader, "CardDetails")
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
           SELECT c.Id, c.Title, c.Description, c.ImageUrl, c.CreatedAt, c.OccasionId, c.UserId, c.CardDetails,
                  up.FireBaseUserId, up.DisplayName, up.Email, up.CreatedAt AS UserCreatedAt,
                  o.Id, o.Name
             FROM Card c
                  JOIN UserProfile up ON c.UserId = up.Id
                  JOIN Occasion o ON c.OccasionId = o.Id
            WHERE up.FireBaseUserId = @firebaseUserId
         ORDER BY c.CreatedAt DESC
        ";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var cards = new List<Card>();
                        while (reader.Read())
                        {
                            cards.Add(new Card()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                               Occasion = new Occasion()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name")
                                },
                                CardDetails = DbUtils.GetString(reader, "CardDetails")
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
                        INSERT INTO Card (
                        Title,
                        Description,
                        ImageUrl,
                        CreatedAt,
                        OccasionId,
                        UserId,
                        CardDetails
                        )
                        
                        OUTPUT INSERTED.ID
	                    
                        VALUES (
                        @Title,
                        @Description,
                        @ImageUrl,
                        @CreatedAt,
                        @OccasionId,
                        @UserId,
                        @CardDetails)
                    ";

                    DbUtils.AddParameter(cmd, "@Title", card.Title);
                    DbUtils.AddParameter(cmd, "@Description", card.Description);
                    DbUtils.AddParameter(cmd, "@ImageUrl", card.ImageUrl);
                    DbUtils.AddParameter(cmd, "@CreatedAt", card.CreatedAt);
                    DbUtils.AddParameter(cmd, "@OccasionId", card.OccasionId);
                    DbUtils.AddParameter(cmd, "@UserId", card.UserId);
                    DbUtils.AddParameter(cmd, "@CardDetails", card.CardDetails);

                    card.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM Card 
                WHERE Id = @Id
            ";

                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}

