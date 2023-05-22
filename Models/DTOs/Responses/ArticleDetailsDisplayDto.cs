#nullable disable

using System.ComponentModel.DataAnnotations;

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class ArticleDetailsDisplayDto
    {
        [Key]
        public int Id { get; set; }
        public string TitreFR { get; set; }
        public string DescriptionFR { get; set; }
        public string TitreEN { get; set; }
        public string DescriptionEN { get; set; }
        public string TitreNL { get; set; }
        public string DescriptionNL { get; set; }
        public string Categorie { get; set; }
        public string Module { get; set; }
        public int AuteurId { get; set; }
        public string Version { get; set; }
        public int IsBrouillon { get; set; }
        public int IsArchive { get; set; }

        public bool IsNew { get; set; }

        
       private DateTime _datePublication;
    private DateTime _dateModification;

        public string DatePublication 
        { 
            get => _datePublication.ToString("dd-MM-yyyy"); 
            set => _datePublication = DateTime.Parse(value); 
        }

        public string DateModification 
        { 
            get => _dateModification.ToString("dd-MM-yyyy"); 
            set => _dateModification = DateTime.Parse(value); 
        }
    }
}