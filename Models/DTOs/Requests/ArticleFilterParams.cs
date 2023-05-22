

namespace PatchNote.Api.Models.DTOs.Requests
{
    public class ArticleFilterParams
        {
        public int? CategoryId { get; set; }
        public int? ModuleId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Page { get; set; } = 1;
        public int Limit { get; set; } = 10;
        public string? FilterType { get; set; } = "";
        public string SortColumn { get; set; } = "";
        public bool SortDirection { get; set; } = true;
        
    }
}