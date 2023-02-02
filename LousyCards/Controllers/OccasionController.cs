using Microsoft.AspNetCore.Mvc;
using LousyCards.Models;
using LousyCards.Repositories;
using System.Collections.Generic;

namespace LousyCards.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OccasionController : ControllerBase
    {
        private readonly IOccasionRepository _occasionRepository;

        public OccasionController(IOccasionRepository occasionRepository)
        {
            _occasionRepository = occasionRepository;
        }

        [HttpGet]
        public ActionResult<List<Occasion>> GetAllOccasions()
        {
            return Ok(_occasionRepository.GetAllOccasions());
        }

        [HttpGet("{id}")]
        public ActionResult<Occasion> GetOccasionById(int id)
        {
            Occasion occasion = _occasionRepository.GetOccasionById(id);

            if (occasion == null)
            {
                return NotFound();
            }

            return Ok(occasion);
        }
    }
}
