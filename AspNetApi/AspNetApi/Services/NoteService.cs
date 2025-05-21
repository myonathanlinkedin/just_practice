using AspNetApi.Models;
using AspNetApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace AspNetApi.Services
{
    public class NoteService : INoteService
    {
        private readonly NotesDbContext _context;
        public NoteService(NotesDbContext context) => _context = context;

        public IEnumerable<Note> GetAll() => _context.Notes.ToList();

        public Note GetById(int id) => _context.Notes.Find(id);

        public Note Add(Note note)
        {
            _context.Notes.Add(note);
            _context.SaveChanges();
            return note;
        }

        public bool Update(int id, Note note)
        {
            var existing = _context.Notes.Find(id);
            if (existing == null) return false;
            existing.Info1 = note.Info1;
            existing.Info2 = note.Info2;
            _context.SaveChanges();
            return true;
        }

        public bool Delete(int id)
        {
            var note = _context.Notes.Find(id);
            if (note == null) return false;
            _context.Notes.Remove(note);
            _context.SaveChanges();
            return true;
        }
    }
} 