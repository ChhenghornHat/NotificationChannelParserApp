using Microsoft.AspNetCore.Mvc;
using NotificationChannelParserApp.Repo;

namespace NotificationChannelParserApp.Controllers;

public class NotificationController : Controller
{
    private readonly NotificationRepo notificationRepo;

    public NotificationController(NotificationRepo notificationRepo)
    {
        this.notificationRepo = notificationRepo;
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
    
    [HttpGet]
    public async Task<IActionResult> GetNotificationByUsername(string username)
    {
        var notificationsList = await notificationRepo.GetNotificationByUsername(username);
        
        return Ok(notificationsList);
    }
}