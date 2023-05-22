
namespace PatchNote.Api.Models.DTOs.Responses
{
    public class NewsletterDisplayDto
    {
        public int Id { get; set; }
        public string? TitreFR { get; set; }
        public string? ResumeFR { get; set; }
        public string? ContenuFR { get; set; }

        public string? TitreEN { get; set; }
        public string? ResumeEN { get; set; }
        public string? ContenuEN { get; set; }

        public string? TitreNL { get; set; }
        public string? ResumeNL { get; set; }
        public string? ContenuNL { get; set; }

        public byte IsPublished { get; set; }
        public byte IsBrouillon { get; set; }

        public ICollection<NewsletterArticlesListDto>? Articles { get; set; }
    

        private DateTime _datePublication;
        private DateTime _dateCreation;
        private DateTime _dateModification;
        public string DatePublication 
        { 
            get => _datePublication.ToString("dd-MM-yyyy");
            set => _datePublication = DateTime.Parse(value); 
        }

        public string DateCreation 
        { 
            get => _dateCreation.ToString("dd-MM-yyyy"); 
            set => _dateCreation = DateTime.Parse(value); 
        }

        public string DateModification 
        { 
            get => _dateModification.ToString("dd-MM-yyyy"); 
            set => _dateModification = DateTime.Parse(value); 
        }

    }
}