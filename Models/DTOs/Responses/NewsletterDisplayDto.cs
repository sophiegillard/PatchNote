
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

        public required string DateCreation { get; set; }
        public required string DatePublication { get; set; }
        public string? DateModification { get; set; }


    }
}