using Microsoft.EntityFrameworkCore;
using NotificationChannelParserApp.Data;
using NotificationChannelParserApp.Models;

namespace NotificationChannelParserApp.Repo;

public class NotificationRepo
{
    private readonly ApplicationDbContext dbContext;
    private readonly IHttpContextAccessor httpContextAccessor;
    private const string Username = "Username";

    public NotificationRepo(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
        this.dbContext = dbContext;
        this.httpContextAccessor = httpContextAccessor;
    }

    public async Task<List<Notifications>> GetAllNotification()
    {
        var username = httpContextAccessor.HttpContext?.Session.GetString(Username);

        return await dbContext.Notifications
            .Where(row =>
                row.Username == "All" ||
                row.Username == username)
            .OrderByDescending(row => row.Id)
            .ToListAsync();
    }

    public async Task<List<Notifications>> GetTodayNotification()
    {
        /*var username = httpContextAccessor.HttpContext?.Session.GetString(Username);
        
        return await dbContext.Notifications
            .Where(row => 
                row.Username == username ||
                row.Username == "All" &&
                row.NotificationDateTime == DateTime.Now)
            .OrderByDescending(row => row.Id)
            .ToListAsync();*/
        
        var username = httpContextAccessor.HttpContext?.Session.GetString(Username);

        return await dbContext.Notifications
            .Where(row =>
                row.Username == username || 
                row.Username == "All" ||
                row.NotificationDateTime.Date == DateTime.Now &&
                row.Username != username)
            .OrderByDescending(row => row.Id)
            .ToListAsync();
    }

    public async Task<List<User>> GetDdlUsername()
    {
        var username = httpContextAccessor.HttpContext?.Session.GetString(Username);
        
        return await dbContext.Users
            .Where(row => row.Username != username)
            .ToListAsync();
    }

    public async Task CreateNotification(Notifications notifications)
    {
        var username = httpContextAccessor.HttpContext?.Session.GetString(Username);
        
        var notification = new Notifications
        {
            Username = notifications.Username,
            Message = notifications.Message,
            MessageType = notifications.MessageType,
            SendBy = username,
            NotificationDateTime = DateTime.Now
        };

        dbContext.Notifications.Add(notification);
        await dbContext.SaveChangesAsync();
    }
}