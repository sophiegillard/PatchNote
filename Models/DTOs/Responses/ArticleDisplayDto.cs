#nullable disable

using System.ComponentModel.DataAnnotations;

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class ArticleDisplayDto
    {
        [Key]
        public int Id { get; set; }
        public string TitreFR { get; set; }
        public string ContenuFR { get; set; }
        public string TitreEN { get; set; }
        public string ContenuEN { get; set; }
        public string TitreNL { get; set; }
        public string ContenuNL { get; set; }
        public string Categorie { get; set; }
        public string Module { get; set; }
        public int CategorieId { get; set; }
        public int ModuleId { get; set; }
        public int IsBrouillon { get; set; }
        public int IsArchive { get; set; }
        public int? NewsletterId { get; set; }


        private DateTime _datePublication;
        public string DatePublication
        {
            get => _datePublication.ToString("yyyy-MM-dd");
            set => _datePublication = DateTime.Parse(value);
        }
    }
}