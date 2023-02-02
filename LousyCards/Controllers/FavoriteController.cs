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
        public FavoriteController(IFavoriteRepository favoriteRepository, IUserProfileRepository userProfileRepository)
        {
            _favoriteRepository = favoriteRepository;
            _userProfileRepository = userProfileRepository;
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
        [HttpPost]
        public IActionResult Add(CardFavorite favorite)
        {
            UserProfile user = GetCurrentUserProfile();

            favorite.CreatedAt = DateTime.Now;
            favorite.UserId = user.Id;
            _favoriteRepository.Add(favorite);
            return CreatedAtAction(nameof(GetAll), favorite);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }

}