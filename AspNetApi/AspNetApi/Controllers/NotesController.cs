using Microsoft.AspNetCore.Mvc;
using AspNetApi.Services;
using AspNetApi.Dtos;
using AspNetApi.Models;
using AutoMapper;
using System.Collections.Generic;
using System.Linq;

namespace AspNetApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly INoteService _service;
        private readonly IMapper _mapper;

        public NotesController(INoteService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<NoteDto>> GetAll()
            => Ok(_service.GetAll().Select(_mapper.Map<NoteDto>));

        [HttpGet("{id}")]
        public ActionResult<NoteDto> GetById(int id)
        {
            var note = _service.GetById(id);
            if (note == null) return NotFound();
            return Ok(_mapper.Map<NoteDto>(note));
        }

        [HttpPost]
        public ActionResult<NoteDto> Create(NoteCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var note = _mapper.Map<Note>(dto);
            var created = _service.Add(note);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, _mapper.Map<NoteDto>(created));
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, NoteUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var note = _mapper.Map<Note>(dto);
            if (!_service.Update(id, note)) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
            => _service.Delete(id) ? NoContent() : NotFound();
    }
} 