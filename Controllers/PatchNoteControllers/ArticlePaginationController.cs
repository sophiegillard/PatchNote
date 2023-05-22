using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Controllers.PatchNoteControllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticlePaginationController : ControllerBase
    {
        private readonly patchNoteDbContext _patchNoteDbContext;
        private readonly ApschoolDbContext _apschoolDbContext;
        public ArticlePaginationController(patchNoteDbContext patchNoteDbContext, ApschoolDbContext apschoolDbContext)
        {
            _patchNoteDbContext = patchNoteDbContext;

            _apschoolDbContext = apschoolDbContext;
        }


         // Get articles pagination details with filters applied
        [HttpGet("/article/details/pagination", Name = "GetArticlesPagination")]
        public IActionResult GetArticlesPagination(
                                        int? categoryId,
                                        int? moduleId,
                                        DateTime? startDate,
                                        DateTime? endDate,
                                        int pageNumber = 1,
                                        int pageSize = 10,
                                        string filterType = "all")
        {
            // Create a query to filter articles based on filter criteria
            IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles;

            switch(filterType)
            {
                case "scheduled":
                    articlesQuery = articlesQuery.Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date > DateTime.Today);
                    break;
                case "published":
                    articlesQuery = articlesQuery.Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today);
                    break;
                case "draft":
                    articlesQuery = articlesQuery.Where(a => a.IsBrouillon == 1 && a.IsArchive == 0);
                    break;
                case "archive":
                    articlesQuery = articlesQuery.Where(a => a.IsArchive == 1);
                    break;
                default:
                    break;
            }

            if (categoryId.HasValue)
            {
                articlesQuery = articlesQuery.Where(a => a.CategorieId == categoryId.Value);
            }

            if (moduleId.HasValue)
            {
                articlesQuery = articlesQuery.Where(a => a.ModuleId == moduleId.Value);
            }

            if (startDate.HasValue)
            {
                var searchStartDate = startDate.Value.Date;
                articlesQuery = articlesQuery.Where(a => a.DatePublication.Date >= searchStartDate);
            }

            if (endDate.HasValue)
            {
                var searchEndDate = endDate.Value.Date.AddDays(1).AddTicks(-1);
                articlesQuery = articlesQuery.Where(a => a.DatePublication.Date <= searchEndDate);
            }

            var totalCount = articlesQuery.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / pageSize);

            var paginationDetails = new
            {
                totalCount,
                totalPages,
                pageSize
            };

            return Ok(paginationDetails);
        }


        // Get articles by10 dynamic loading
        [HttpGet("/article/loadBy10", Name = "GetArticlesBy10")]
        public IActionResult GetArticlesBy10(
            int? categoryId,
            int? moduleId,
            DateTime? startDate,
            DateTime? endDate,
            string? cursor = null,
            int limit = 10)
        {
            // Create a query to filter articles based on filter criteria and get the next batch of articles
            IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
                .Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today);

            if (categoryId.HasValue)
            {
                articlesQuery = articlesQuery.Where(a => a.CategorieId == categoryId.Value);
            }

            if (moduleId.HasValue)
            {
                articlesQuery = articlesQuery.Where(a => a.ModuleId == moduleId.Value);
            }

            if (startDate.HasValue)
            {
                var searchStartDate = startDate.Value.Date;
                articlesQuery = articlesQuery.Where(a => a.DatePublication.Date >= searchStartDate);
            }

            if (endDate.HasValue)
            {
                var searchEndDate = endDate.Value.Date.AddDays(1).AddTicks(-1);
                articlesQuery = articlesQuery.Where(a => a.DatePublication.Date <= searchEndDate);
            }

            if (!string.IsNullOrEmpty(cursor))
                {
                    // Decode the cursor to get the last item's ID and sort order
                    var (lastItemId, sortOrder) = DecodeCursor(cursor);

                    if (sortOrder == SortOrder.Ascending)
                    {
                        // If the previous page was sorted in ascending order, start from the item after the last one
                        articlesQuery = articlesQuery.Where(item => item.Id > lastItemId);
                    }
                    else
                    {
                        // If the previous page was sorted in descending order, start from the item before the last one
                        articlesQuery = articlesQuery.Where(item => item.Id < lastItemId);
                    }
                }


            var articlesToDisplay = articlesQuery
                .Include(a => a.Categorie)
                .OrderByDescending(a => a.DatePublication)
                .Take(limit + 1)
                .ToList();

            var hasNextPage = articlesToDisplay.Count > limit;
                if (hasNextPage)
                {
                    // If there's a next page, remove the extra item from the result set
                    articlesToDisplay.RemoveAt(articlesToDisplay.Count - 1);
                }
        
            // Get the last item in the result set and encode its ID and sort order as the cursor for the next page
                var lastItem = articlesToDisplay.LastOrDefault();
                var nextCursor = lastItem != null
                    ? EncodeCursor(lastItem.Id, SortOrder.Descending)
                    : null;


            // Map the articles to display to DTOs
            var articleDisplayDtos = articlesToDisplay.Select(a => new ArticleDisplayDto
            {
                Id = a.Id,
                TitreFR = a.TitreFR,
                ContenuFR = a.ContenuFR,
                TitreEN = a.TitreEN,
                ContenuEN = a.ContenuEN,
                TitreNL = a.TitreNL,
                ContenuNL = a.ContenuNL,
                Categorie = a.Categorie.Nom,
                CategorieId = a.CategorieId,
                ModuleId = a.ModuleId,
                Module = _apschoolDbContext.Modules.FirstOrDefault(m => m.id == a.ModuleId)?.nom,
                IsBrouillon = a.IsBrouillon,
                IsArchive = a.IsArchive,
                DatePublication = a.DatePublication.ToString("yyyy-MM-dd"),
                
            }).ToList();

            // Return the next batch of articles to display, along with the ID of the last article in the batch
            return Ok(new { articles = articleDisplayDtos, 
                            HasNextPage = hasNextPage,
                            NextCursor = nextCursor});
        }

        private (int, SortOrder) DecodeCursor(string cursor)
        {
            var decodedCursor = Encoding.UTF8.GetString(Convert.FromBase64String(cursor));
            var parts = decodedCursor.Split('|');
            if (parts.Length != 2 || !int.TryParse(parts[0], out int itemId) || !Enum.TryParse<SortOrder>(parts[1], out var sortOrder))
            {
                throw new ArgumentException("Invalid cursor");
            }
            return (itemId, sortOrder);
        }

        private string EncodeCursor(int itemId, SortOrder sortOrder)
        {
            var cursor = $"{itemId}|{sortOrder}";
            return Convert.ToBase64String(Encoding.UTF8.GetBytes(cursor));
        }

        public enum SortOrder
        {
            Ascending,
            Descending
        }


        // Get articles by10 dynamic loading
        [HttpGet("/homeArticles/", Name = "FilteredArticlesHome")]
        public IActionResult GetArticlesBy10(
            int? categoryId,
            int? moduleId,
            DateTime? startDate,
            DateTime? endDate)
            {
                // Create a query to filter articles based on filter criteria and get the next batch of articles
                IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
                    .Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today);

                if (categoryId.HasValue)
                {
                    articlesQuery = articlesQuery.Where(a => a.CategorieId == categoryId.Value);
                }

                if (moduleId.HasValue)
                {
                    articlesQuery = articlesQuery.Where(a => a.ModuleId == moduleId.Value);
                }

                if (startDate.HasValue)
                {
                    var searchStartDate = startDate.Value.Date;
                    articlesQuery = articlesQuery.Where(a => a.DatePublication.Date >= searchStartDate);
                }

                if (endDate.HasValue)
                {
                    var searchEndDate = endDate.Value.Date.AddDays(1).AddTicks(-1);
                    articlesQuery = articlesQuery.Where(a => a.DatePublication.Date <= searchEndDate);
                }

                var articlesToDisplay = articlesQuery
                    .Include(a => a.Categorie)
                    .OrderByDescending(a => a.DatePublication)
                    .ToList();

            
                // Map the articles to display to DTOs
                var articleDisplayDtos = articlesToDisplay.Select(a => new ArticleDisplayDto
                {
                    Id = a.Id,
                    TitreFR = a.TitreFR,
                    ContenuFR = a.ContenuFR,
                    TitreEN = a.TitreEN,
                    ContenuEN = a.ContenuEN,
                    TitreNL = a.TitreNL,
                    ContenuNL = a.ContenuNL,
                    Categorie = a.Categorie.Nom,
                    CategorieId = a.CategorieId,
                    ModuleId = a.ModuleId,
                    Module = _apschoolDbContext.Modules.FirstOrDefault(m => m.id == a.ModuleId)?.nom,
                    IsBrouillon = a.IsBrouillon,
                    IsArchive = a.IsArchive,
                    DatePublication = a.DatePublication.ToString("yyyy-MM-dd"),
                    
                }).ToList();

                // Return the next batch of articles to display, along with the ID of the last article in the batch
                return Ok(articleDisplayDtos);
            }

    }
}




//  // Get articles by10 dynamic loading
//         [HttpGet("/article/loadBy10", Name = "GetArticlesBy10")]
// public IActionResult GetArticlesBy10(
//     int? categoryId,
//     int? moduleId,
//     DateTime? startDate,
//     DateTime? endDate,
//     int pageSize = 10)
// {
//     // Create a query to filter articles based on filter criteria and get the next batch of articles
//     IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
//         .Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today);

//     if (categoryId.HasValue)
//     {
//         articlesQuery = articlesQuery.Where(a => a.CategorieId == categoryId.Value);
//     }

//     if (moduleId.HasValue)
//     {
//         articlesQuery = articlesQuery.Where(a => a.ModuleId == moduleId.Value);
//     }

//     if (startDate.HasValue)
//     {
//         var searchStartDate = startDate.Value.Date;
//         articlesQuery = articlesQuery.Where(a => a.DatePublication.Date >= searchStartDate);
//     }

//     if (endDate.HasValue)
//     {
//         var searchEndDate = endDate.Value.Date.AddDays(1).AddTicks(-1);
//         articlesQuery = articlesQuery.Where(a => a.DatePublication.Date <= searchEndDate);
//     }

//     var articlesToDisplay = articlesQuery
//         .Include(a => a.Categorie)
//         .OrderByDescending(a => a.DatePublication)
//         .Take(pageSize)
//         .ToList();

  


//     // Map the articles to display to DTOs
//     var articleDisplayDtos = articlesToDisplay.Select(a => new ArticleDisplayDto
//     {
//         Id = a.Id,
//         TitreFR = a.TitreFR,
//         ContenuFR = a.ContenuFR,
//         TitreEN = a.TitreEN,
//         ContenuEN = a.ContenuEN,
//         TitreNL = a.TitreNL,
//         ContenuNL = a.ContenuNL,
//         Categorie = a.Categorie.Nom,
//         CategorieId = a.CategorieId,
//         ModuleId = a.ModuleId,
//         Module = _apschoolDbContext.Modules.FirstOrDefault(m => m.id == a.ModuleId)?.nom,
//         IsBrouillon = a.IsBrouillon,
//         IsArchive = a.IsArchive,
//         DatePublication = a.DatePublication.ToString("yyyy-MM-dd"),
        
//     }).ToList();

//     // Return the next batch of articles to display, along with the ID of the last article in the batch
//     return Ok(new { articles = articleDisplayDtos});
// }

//  }