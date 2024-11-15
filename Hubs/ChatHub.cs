using Microsoft.AspNetCore.SignalR;
using ChatApplication.Data;
using ChatApplication.Models;

namespace ChatApplication.Hubs;

public class ChatHub : Hub
{
    private readonly ChatDbContext _context;

    public ChatHub(ChatDbContext context)
    {
        _context = context;
    }

    public async Task SendMessage(string username, string message)
    {
        var timestamp = DateTime.UtcNow;
        var newMessage = new Message
        {
            Username = username,
            Content = message,
            Timestamp = timestamp
        };

        _context.Messages.Add(newMessage);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveMessage", username, message, timestamp);
    }
} 