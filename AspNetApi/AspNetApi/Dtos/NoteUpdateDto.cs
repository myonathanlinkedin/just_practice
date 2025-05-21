using System.ComponentModel.DataAnnotations;

namespace AspNetApi.Dtos
{
    public class NoteUpdateDto
    {
        [Required]
        public string Info1 { get; set; }
        [Required]
        public string Info2 { get; set; }
    }
} 