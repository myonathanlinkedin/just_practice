using AspNetApi.Models;
using System.Collections.Generic;

namespace AspNetApi.Services
{
    public interface INoteService
    {
        IEnumerable<Note> GetAll();
        Note GetById(int id);
        Note Add(Note note);
        bool Update(int id, Note note);
        bool Delete(int id);
    }
} 