using LousyCards.Models;
using LousyCards.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;

namespace LousyCards.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        private readonly ICardRepository _cardRepository;
        public FavoriteController(IFavoriteRepository favoriteRepository, IUserProfileRepository userProfileRepository, ICardRepository cardRepository)
        {
            _favoriteRepository = favoriteRepository;
            _userProfileRepository = userProfileRepository;
            _cardRepository = cardRepository;   
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_favoriteRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{cardId}")]
        public IActionResult GetByCardId(int cardId)
        {
            return Ok(_favoriteRepository.GetByCardId(cardId));
        }

        [Authorize]
        [HttpGet("userfavorites")]
        public IActionResult GetUserFavorites()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_favoriteRepository.GetByUserId(firebaseUserId));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add(CardFavorite favorite)
        {

            favorite.CreatedAt = DateTime.Now;
            _favoriteRepository.Add(favorite);
            return CreatedAtAction(
                nameof(GetAll), new { favorite.Id }, favorite);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        private Card GetCurrentCard(int cardId)
        {
            return _cardRepository.GetById(cardId);
        }
        [Authorize]
        [HttpDelete("{cardId}/{userId}")]
        public IActionResult Delete(int cardId, int userId)
        {
            _favoriteRepository.Delete(cardId, userId);
            return NoContent();
        }

    }
}