

namespace PatchNote.Api.Models.DTOs.Requests
{
    public class NewsletterFilterParams
        {
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 10;
        public string? NewsletterState { get; set; } = "";
        public string SortColumn { get; set; } = "";
        public bool SortDirection { get; set; } = true;
        
    }
}