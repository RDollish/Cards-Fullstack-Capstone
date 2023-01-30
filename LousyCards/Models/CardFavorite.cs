using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System;
using LousyCards.Models;
using Microsoft.Extensions.Hosting;

namespace LousyCards.Models
{
    public class CardFavorite
    {
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; }

        [DisplayName("Card")]
        public int CardId { get; set; }
        public Card Card { get; set; }


        [DisplayName("User")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}