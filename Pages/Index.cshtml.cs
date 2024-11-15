using Microsoft.AspNetCore.Mvc.RazorPages;
using ChatApplication.Data;
using ChatApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatApplication.Pages;

public class IndexModel : PageModel
{
    private readonly ChatDbContext _context;
    public List<Message> RecentMessages { get; set; }

    public IndexModel(ChatDbContext context)
    {
        _context = context;
    }

    public async Task OnGetAsync()
    {
        RecentMessages = await _context.Messages
            .OrderByDescending(m => m.Timestamp)
            .Take(50)
            .OrderBy(m => m.Timestamp)
            .ToListAsync();
    }
}
