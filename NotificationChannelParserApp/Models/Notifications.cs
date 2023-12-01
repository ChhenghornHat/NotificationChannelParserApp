using System.ComponentModel.DataAnnotations;

namespace NotificationChannelParserApp.Models
{
    public class Notifications
    {
        [Key]
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Message { get; set; }
        public string? MessageType { get; set; }
        public string? SendBy { get; set; }
        public DateTime NotificationDateTime { get; set; }
    }
}
