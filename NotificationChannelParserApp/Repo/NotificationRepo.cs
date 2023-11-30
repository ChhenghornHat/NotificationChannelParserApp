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
            .Where(entity => 
                entity.Username.Contains("All") &&
                entity.Username == username)
            .OrderBy(row => row.Id)
            .ToListAsync();
    }

    public async Task<List<Notifications>> GetTodayNotification()
    {
        var username = httpContextAccessor.HttpContext?.Session.GetString(Username);
        
        return await dbContext.Notifications
            .Where(entity => 
                entity.Username == username ||
                entity.NotificationDateTime == DateTime.Today)
            .OrderBy(row => row.Id)
            .ToListAsync();
    }

    public async Task<List<Notifications>?> GetNotificationByUsername(string username)
    {
        return await dbContext.Notifications
            .Where(entity => entity.Username.Contains(username))
            .ToListAsync();
    }
}