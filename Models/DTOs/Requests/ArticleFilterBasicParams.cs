

namespace PatchNote.Api.Models.DTOs.Requests
{
    public class ArticleFilterBasicParams
    {
        public int? categoryId { get; set; }
        public int? moduleId { get; set; }
        public DateTime? startDate { get; set; }
        public DateTime? endDate { get; set; }

    }
}