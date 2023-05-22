#nullable disable

using System.ComponentModel.DataAnnotations;

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class ArticleNewsletterIdDisplayDto
    {
        [Key]
        public int Id { get; set; }
        public string TitreFR { get; set; }
        public int? NewsletterId { get; set; }
    }
}