using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using LousyCards.Models;
using LousyCards.Repositories;

namespace LousyCards.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OccasionController : ControllerBase
    {
        private readonly IOccasionRepository _occasionRepository;

        public OccasionController(IOccasionRepository occasionRepository)
        {
            _occasionRepository = occasionRepository;
        }

        [HttpGet]
        public IActionResult GetAllOccasions()
        {
            var occasions = _occasionRepository.GetAllOccasions();

            return Ok(occasions);
        }

        [HttpGet("{id}")]
        public IActionResult GetOccasionById(int id)
        {
            var occasion = _occasionRepository.GetOccasionById(id);

            if (occasion == null)
            {
                return NotFound();
            }

            return Ok(occasion);
        }
    }
}
