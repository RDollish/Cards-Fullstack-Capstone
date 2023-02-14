using LousyCards.Models;
using LousyCards.Utils;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;


using Microsoft.Extensions.Configuration;

namespace LousyCards.Repositories
{
    public class CommentRepository : BaseRepository, ICommentRepository
    {
        public CommentRepository(IConfiguration configuration) : base(configuration) { }
        public List<CardComment> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT co.Id AS CommentId, co.Comment, co.CreatedAt, co.UserId, co.CardId,
                    uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,
                    c.Id AS CardId, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    FROM Comment co
                    JOIN UserProfile uc ON co.UserId = uc.Id
                    JOIN Card c ON co.CardId = c.Id
                    ORDER BY co.CreatedAt DESC";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var comments = new List<CardComment>();
                        while (reader.Read())
                        {
                            comments.Add(new CardComment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                Comment = DbUtils.GetString(reader, "Comment"),
                                CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                CardId = DbUtils.GetInt(reader, "CardId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                                Card = new Card()
                                {
                                    Id = DbUtils.GetInt(reader, "CardId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                    OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                }
                            });
                        }

                        return comments;
                    }
                }
            }
        }

        public List<CardComment> GetByCardId(int cardId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT co.Id AS CommentId, co.Comment, co.CreatedAt, co.UserId, co.CardId,
                    uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,
                    c.Id AS CardId, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                FROM Comment co
                JOIN UserProfile uc ON co.UserId = uc.Id
                JOIN Card c ON co.CardId = c.Id
                WHERE c.CreatedAt <= SYSDATETIME()
                ORDER BY c.CreatedAt DESC

        ";

                    cmd.Parameters.AddWithValue("@cardId", cardId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var comments = new List<CardComment>();
                        while (reader.Read())
                        {
                            comments.Add(new CardComment()
                            {
                                Id = DbUtils.GetInt(reader, "CommentId"),
                                Comment = DbUtils.GetString(reader, "Comment"),
                                UserProfile = new UserProfile()
                                {
                                    FirebaseUserId = DbUtils.GetString(reader, "FireBaseUserId"),
                                    DisplayName = DbUtils.GetString(reader, "DisplayName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "UserCreatedAt")
                                },
                                Card = new Card()
                                {
                                    Id = DbUtils.GetInt(reader, "CardId"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    ImageUrl = DbUtils.GetString(reader, "ImageUrl"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    CreatedAt = DbUtils.GetDateTime(reader, "CreatedAt"),
                                    OccasionId = DbUtils.GetInt(reader, "OccasionId"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                }
                            });
                        }

                        return comments;
                    }
                }
            }
        }

        public List<CardComment> GetLastFiveByUserId(int userId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT top 5 c.Id, c.Comment, c.CreatedAt, c.CardId, c.UserId
                FROM Comment c
                WHERE c.UserId = @UserId
                ORDER BY c.CreatedAt DESC";

                    cmd.Parameters.AddWithValue("@UserId", userId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<CardComment> comments = new List<CardComment>();

                        while (reader.Read())
                        {
                            comments.Add(new CardComment()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Comment = reader.GetString(reader.GetOrdinal("Comment")),
                                CreatedAt = reader.GetDateTime(reader.GetOrdinal("CreatedAt")),
                                CardId = reader.GetInt32(reader.GetOrdinal("CardId")),
                                UserId = reader.GetInt32(reader.GetOrdinal("UserId"))
                            });
                        }

                        reader.Close();

                        return comments;
                    }
                }
            }
        }

        public void Add(CardComment comment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                INSERT INTO Comment (Comment, CardId, UserId, CreatedAt)
                VALUES (@Comment, @CardId, @UserId, @CreatedAt)
            ";

                    DbUtils.AddParameter(cmd, "@Comment", comment.Comment);
                    DbUtils.AddParameter(cmd, "@CardId", comment.CardId);
                    DbUtils.AddParameter(cmd, "@UserId", comment.UserId);
                    DbUtils.AddParameter(cmd, "@CreatedAt", comment.CreatedAt);

                    cmd.ExecuteNonQuery();
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
                DELETE FROM Comment 
                WHERE Id = @Id
            ";

                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
