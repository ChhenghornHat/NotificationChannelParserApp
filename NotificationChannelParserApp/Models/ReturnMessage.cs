namespace NotificationChannelParserApp.Models;

public class ReturnMessage
{
    public int StatusCode { get; set; }
    public string StatusMessage { get; set; }
    public string? MessageDetail { get; set; }
}