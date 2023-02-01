using LousyCards.Models;
using LousyCards.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;
using LousyCards.Models;
using LousyCards.Repositories;

namespace LousyCards.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardRepository _cardRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CardController(ICardRepository cardRepository, IUserProfileRepository userProfileRepository)
        {
            _cardRepository = cardRepository;
            _userProfileRepository = userProfileRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_cardRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetCardById(int id)
        {
            var post = _cardRepository.GetById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [Authorize]
        [HttpGet("usercards")]
        public IActionResult GetUserCards()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_cardRepository.GetByUserId(firebaseUserId));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Post(Card card)
        {
            UserProfile user = GetCurrentUserProfile();

            card.CreatedAt = DateTime.Now;
            card.UserId = user.Id;
            _cardRepository.Add(card);
            return CreatedAtAction(
                nameof(GetCardById), new { card.Id }, card);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}