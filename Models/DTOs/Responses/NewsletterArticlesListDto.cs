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
        
        private DateTime _datePublication;
        public string DatePublication 
        { 
            get => _datePublication.ToString("yyyy-MM-dd"); 
            set => _datePublication = DateTime.Parse(value); 
        }

        public string DatePublicationShort
        { 
            get => _datePublication.ToString("dd-MM-yy"); 
            set => _datePublication = DateTime.Parse(value); 
        }
    }
}