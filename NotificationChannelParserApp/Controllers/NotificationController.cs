using Microsoft.AspNetCore.Mvc;
using NotificationChannelParserApp.Models;
using NotificationChannelParserApp.Repo;

namespace NotificationChannelParserApp.Controllers;

public class NotificationController : Controller
{
    private readonly NotificationRepo notificationRepo;
    private readonly ReturnMessage returnMessage = new();

    public NotificationController(NotificationRepo notificationRepo)
    {
        this.notificationRepo = notificationRepo;
    }

    [Route("notifications")]
    public IActionResult Notification()
    {
        var username = HttpContext.Session.GetString("Username");

        if (username != null)
        {
            return View();
        }

        return RedirectToAction("SignIn", "Account");
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllNotification()
    {
        var notificationsList = await notificationRepo.GetAllNotification();
        
        return Ok(notificationsList);
    }
    
    [HttpGet]
    public async Task<IActionResult> GetTodayNotification()
    {
        var notificationsList = await notificationRepo.GetTodayNotification();
        
        return Ok(notificationsList);
    }
    
    // GET: Get Ddl Username
    [HttpGet]
    public async Task<IActionResult> GetDdlUsername()
    {
        try
        {
            var usernameList = await notificationRepo.GetDdlUsername();

            return Ok(usernameList);
        }
        catch (Exception e)
        {
            returnMessage.StatusCode = 500;
            returnMessage.StatusMessage = "Oops! Something went wrong. Please try again.";
            returnMessage.MessageDetail = e.Message;

            return Ok(returnMessage);
        }
    }
    
    // POST: Post To Send Message Notification
    [HttpPost]
    public async Task<IActionResult> SendMessage(Notifications notifications)
    {
        try
        {
            await notificationRepo.CreateNotification(notifications);
            
            returnMessage.StatusCode = 200;
            returnMessage.StatusMessage = "Notification send successfully.";
        }
        catch (Exception e)
        {
            returnMessage.StatusCode = 500;
            returnMessage.StatusMessage = "Notification send failed.";
            returnMessage.MessageDetail = e.Message;
        }

        return Ok(returnMessage);
    }
}