using Microsoft.AspNetCore.Mvc;
using NotificationChannelParserApp.Models;
using System.Diagnostics;

namespace NotificationChannelParserApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [Route("/dashboard")]
        public IActionResult Index()
        {
            var username = HttpContext.Session.GetString("Username");

            if (username != null)
            {
                return View();
            }

            return RedirectToAction("SignIn", "Account");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}