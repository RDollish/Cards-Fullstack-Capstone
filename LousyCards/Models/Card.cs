using LousyCards.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace LousyCards.Models
{
    public class Card
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public DateTime CreatedAt { get; set; }

        public int OccasionId { get; set; }


        public int UserId { get; set; }
        public string CardDetails { get; set; }

        public Occasion Occasion { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}