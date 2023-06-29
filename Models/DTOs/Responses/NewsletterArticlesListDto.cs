using System.ComponentModel.DataAnnotations;

#nullable disable

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class NewsletterArticlesListDto
    {
        [Key]
        public int Id { get; set; }
        public string TitreFR { get; set; }
        public string TitreEN { get; set; }
        public string TitreNL { get; set; }

        public int? NewsletterId { get; set; }

        public int CategorieId { get; set; }

        public string Categorie { get; set; }

        public string Module { get; set; }

        public required string DatePublication { get; set; }
        public required string DatePublicationShort { get; set; }
    }
}