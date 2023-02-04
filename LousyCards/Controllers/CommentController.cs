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
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public CommentController(ICommentRepository commentRepository, IUserProfileRepository userProfileRepository)
        {
            _commentRepository = commentRepository;
            _userProfileRepository = userProfileRepository;
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_commentRepository.GetAll());
        }

        [Authorize]
        [HttpGet("{cardId}")]
        public IActionResult GetByCardId(int cardId)
        {
            return Ok(_commentRepository.GetByCardId(cardId));
        }

        [Authorize]
        [HttpPost]
        public IActionResult Add(CardComment comment)
        {

            comment.CreatedAt = DateTime.Now;
            _commentRepository.Add(comment);
            return CreatedAtAction(
                nameof(GetAll), new { comment.Id }, comment);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepository.Delete(id);
            return NoContent();
        }

    }

}