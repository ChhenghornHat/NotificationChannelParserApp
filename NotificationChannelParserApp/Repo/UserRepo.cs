using Microsoft.EntityFrameworkCore;
using NotificationChannelParserApp.Data;
using NotificationChannelParserApp.Models;

namespace NotificationChannelParserApp.Repo
{
    public class UserRepo
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<User> GetUserDetails(string username, string password)
        {
            return await dbContext.Users.FirstOrDefaultAsync(user => user.Username == username && user.Password == password);
        }
    }
}
