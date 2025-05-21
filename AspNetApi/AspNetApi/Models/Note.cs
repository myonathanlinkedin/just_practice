using System.ComponentModel.DataAnnotations;

namespace AspNetApi.Models
{
    public class Note
    {
        public int Id { get; set; }
        public string Info1 { get; set; }
        public string Info2 { get; set; }
    }
} 