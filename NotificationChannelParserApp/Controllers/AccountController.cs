using Microsoft.AspNetCore.Mvc;
using NotificationChannelParserApp.Repo;

namespace NotificationChannelParserApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly UserRepo userRepo;

        public AccountController(UserRepo userRepo)
        {
            this.userRepo = userRepo;
        }

        public IActionResult SignIn()
        {
            var username = HttpContext.Session.GetString("Username");

            if (username == null)
            {
                return View();
            }

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(string username, string password)
        {
            var userFromDb = await userRepo.GetUserDetails(username, password);

            if (userFromDb == null)
            {
                ModelState.AddModelError("Login", "Invalid credentials");
                return View();
            }

            HttpContext.Session.SetString("Username", userFromDb.Username);

            return RedirectToAction("Index", "Home");
        }

        public IActionResult SignOut()
        {
            HttpContext.Session.Remove("Username");
            return RedirectToAction(nameof(SignIn));
        }
    }
}
