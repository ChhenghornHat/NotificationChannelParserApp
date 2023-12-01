using Microsoft.AspNetCore.Http.HttpResults;
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

        public async Task<List<User?>> GetAll()
        {
            return await dbContext.Users.OrderByDescending(row => row!.Id).ToListAsync();
        }
        
        public async Task<User?> GetById(int id)
        {
            return await dbContext.Users.FindAsync(id);
        }

        public async Task Create(User user)
        {
            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
        }

        public async Task Update(User user)
        {
            var existingUser = dbContext.Users.Local.FirstOrDefault(u => u!.Id == user.Id);
    
            if (existingUser != null)
            {
                dbContext.Entry(existingUser).State = EntityState.Detached;
            }

            dbContext.Users.Update(user);
            await dbContext.SaveChangesAsync();
        }
    }
}
