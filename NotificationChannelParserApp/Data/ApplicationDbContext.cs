using Microsoft.EntityFrameworkCore;
using NotificationChannelParserApp.Models;

namespace NotificationChannelParserApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }

        public DbSet<HubConnection> HubConnections { get; set; }
        public DbSet<Notifications> Notifications { get; set; }
        public DbSet<User> Users { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Notifications>().ToTable(tb => tb.HasTrigger("Notifications"));
        }
    }
}
