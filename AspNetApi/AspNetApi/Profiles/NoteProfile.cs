using AutoMapper;
using AspNetApi.Models;
using AspNetApi.Dtos;

namespace AspNetApi.Profiles
{
    public class NoteProfile : Profile
    {
        public NoteProfile()
        {
            CreateMap<Note, NoteDto>();
            CreateMap<NoteCreateDto, Note>();
            CreateMap<NoteUpdateDto, Note>();
        }
    }
} 