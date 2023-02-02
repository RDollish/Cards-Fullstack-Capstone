﻿using LousyCards.Models;
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
           SELECT co.Id, co.Comment, co.CreatedAt, co.UserId, co.CardId

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    
             FROM Comment co
                  JOIN UserProfile uc ON co.UserId = uc.Id
                  JOIN Card c ON co.CardId = c.Id
            WHERE c.CreatedAt <= SYSDATETIME()
         ORDER BY c.CreatedAt DESC
        ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var comments = new List<CardComment>();
                        while (reader.Read())
                        {
                            comments.Add(new CardComment()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
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
           SELECT co.Id, co.Comment, co.CreatedAt, co.UserId, co.CardId

                  uc.FireBaseUserId, uc.DisplayName, uc.Email, uc.CreatedAt AS UserCreatedAt,

                  c.Id, c.Title, c.ImageUrl, c.CreatedAt, c.Description, c.UserId, c.OccasionId, c.CardDetails
                    
             FROM Comment co
                  JOIN UserProfile uc ON co.UserId = uc.Id
                  JOIN Card c ON co.CardId = c.Id
            WHERE c.Id = @cardId
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
                                Id = DbUtils.GetInt(reader, "Id"),
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
                INSERT INTO Comment (Comment, CardId, UserId)
                VALUES (@Comment, @CardId, @UserId)
            ";

                    cmd.Parameters.AddWithValue("@Comment", comment.Comment);
                    cmd.Parameters.AddWithValue("@CardId", comment.Card.Id);
                    cmd.Parameters.AddWithValue("@UserId", comment.UserProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


    }
}
