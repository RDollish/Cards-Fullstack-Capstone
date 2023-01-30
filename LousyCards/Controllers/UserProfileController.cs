using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using LousyCards.Models;
using LousyCards.Repositories;

namespace LousyCards.Controllers
{
    public class UserProfileController : Controller
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository profileRepository)
        {
            _userProfileRepository = profileRepository;
        }
        // GET: UserProfileController      Shows all active accounts
        public ActionResult Index()
        {
            List<UserProfile> userProfiles = _userProfileRepository.GetAll();

            if (userProfiles.Count < 1)
            {
                return NotFound();
            }

            return View(userProfiles);
        }


        // GET: UserProfileController/Details/5
        [Authorize]
        public ActionResult Details(int id)
        {
            UserProfile userProfile = _userProfileRepository.GetById(id);

            if (userProfile == null )
            {
                return NotFound();
            }

            return View(userProfile);
        }
    }
}