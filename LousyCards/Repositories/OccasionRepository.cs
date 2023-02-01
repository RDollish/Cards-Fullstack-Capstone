using LousyCards.Models;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace LousyCards.Repositories
{
    public class OccasionRepository : BaseRepository, IOccasionRepository
    {
        public OccasionRepository(IConfiguration configuration) : base(configuration) { }

        public List<Occasion> GetAllOccasions()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM dbo.Occasion
                        ORDER BY [Name]
                    ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        List<Occasion> occasions = new List<Occasion>();

                        while (reader.Read())
                        {
                            Occasion occasion = new Occasion()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            };

                            occasions.Add(occasion);
                        }

                        return occasions;
                    }
                }
            }
        }

        public Occasion GetOccasionById(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();

                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, [Name]
                        FROM dbo.Occasion
                        WHERE Id = @id
                    ";

                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Occasion occasion = new Occasion()
                            {
                                Id = reader.GetInt32(reader.GetOrdinal("Id")),
                                Name = reader.GetString(reader.GetOrdinal("Name"))
                            };

                            return occasion;
                        }

                        return null;
                    }
                }
            }
        }
    }
}
