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
        var newMessage = new Message
        {
            Username = username,
            Content = message,
            Timestamp = DateTime.UtcNow
        };

        _context.Messages.Add(newMessage);
        await _context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveMessage", username, message, newMessage.Timestamp);
    }
} 