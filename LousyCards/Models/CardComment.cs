using System.ComponentModel.DataAnnotations;
using System.ComponentModel;
using System;

namespace LousyCards.Models
{
    public class CardComment
    {
        public int Id { get; set; }

        [Required]
        public string Comment { get; set; }

        public DateTime CreatedAt { get; set; }

        [DisplayName("Card")]
        public int CardId { get; set; }
        public Card Card { get; set; }

        [DisplayName("User")]
        public int UserId { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}