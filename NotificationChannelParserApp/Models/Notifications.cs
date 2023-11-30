using System.ComponentModel.DataAnnotations;

namespace NotificationChannelParserApp.Models
{
    public class Notifications
    {
        [Key]
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Message { get; set; } = null!;
        public string MessageType { get; set; } = null!;
        public DateTime NotificationDateTime { get; set; }
    }
}
