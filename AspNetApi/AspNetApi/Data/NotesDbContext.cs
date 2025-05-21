using Microsoft.EntityFrameworkCore;
using AspNetApi.Models;

namespace AspNetApi.Data
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options) { }
        public DbSet<Note> Notes { get; set; }
    }
} 