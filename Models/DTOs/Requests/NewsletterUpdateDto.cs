
namespace PatchNote.Api.Models.DTOs.Responses
{
    public class NewsletterUpdateDto
    {
        public string? TitreFR { get; set; }
        public string? ResumeFR { get; set; }
        public string? ContenuFR { get; set; }

        public string? TitreEN { get; set; }
        public string? ResumeEN { get; set; }
        public string? ContenuEN { get; set; }

        public string? TitreNL { get; set; }
        public string? ResumeNL { get; set; }
        public string? ContenuNL { get; set; }
        public byte IsBrouillon { get; set; }
        public byte IsPublished { get; set; }
        public DateTime DateModification { get; set; }
        public DateTime DatePublication { get; set; }

    }
}