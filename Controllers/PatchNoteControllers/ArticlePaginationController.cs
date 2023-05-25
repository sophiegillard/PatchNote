using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Models.DTOs.Requests;
using AutoMapper;
using PatchNote.Mapper;
namespace PatchNote.Api.Controllers.PatchNoteControllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticlePaginationController : ControllerBase
    {
        private readonly patchNoteDbContext _patchNoteDbContext;
        private readonly IMapper _mapper;
        public ArticlePaginationController(patchNoteDbContext patchNoteDbContext, IMapper mapper)
        {
            _patchNoteDbContext = patchNoteDbContext;
            _mapper = mapper;
        }


        // Get articles pagination details with filters applied
        [HttpGet("/article/details/pagination", Name = "GetArticlesPagination")]
        public IActionResult GetArticlesPagination(
                        [FromQuery] ArticleFilterBasicParams filterParams,
                        int pageNumber = 1,
                        int pageSize = 10,
                        string filterType = "all")
        {
            // Create a query to filter articles based on filter criteria
            IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles;

            articlesQuery = filterType switch
            {
                "all" => articlesQuery.OrderByDescending(a => a.DatePublication),
                "scheduled" => articlesQuery.Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date > DateTime.Today),
                "published" => articlesQuery.Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today),
                "draft" => articlesQuery.Where(a => a.IsBrouillon == 1 && a.IsArchive == 0),
                "archive" => articlesQuery.Where(a => a.IsArchive == 1),
                _ => articlesQuery
            };

            articlesQuery = articlesQuery
            .Where(a => !filterParams.categoryId.HasValue || a.CategorieId == filterParams.categoryId.Value)
            .Where(a => !filterParams.moduleId.HasValue || a.ModuleId == filterParams.moduleId.Value)
            .Where(a => !filterParams.startDate.HasValue || a.DatePublication.Date >= filterParams.startDate.Value.Date)
            .Where(a => !filterParams.endDate.HasValue || a.DatePublication.Date <= filterParams.endDate.Value.Date.AddDays(1).AddTicks(-1));


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
                        [FromQuery] ArticleFilterBasicParams filterParams,
                        string? cursor = null,
                        int limit = 10)
        {
            // Create a query to filter articles based on filter criteria and get the next batch of articles
            IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
                .Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today);

            articlesQuery = articlesQuery
                .Where(a => !filterParams.categoryId.HasValue || a.CategorieId == filterParams.categoryId.Value)
                .Where(a => !filterParams.moduleId.HasValue || a.ModuleId == filterParams.moduleId.Value)
                .Where(a => !filterParams.startDate.HasValue || a.DatePublication.Date >= filterParams.startDate.Value.Date)
                .Where(a => !filterParams.endDate.HasValue || a.DatePublication.Date <= filterParams.endDate.Value.Date.AddDays(1).AddTicks(-1));


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
                .Include(a => a.Module)
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
            var articleDisplayDtos = new List<ArticleDisplayDto>();

            foreach (var article in articlesToDisplay)
            {
                var articleDisplayDto = _mapper.Map<ArticleDisplayDto>(article);
                articleDisplayDtos.Add(articleDisplayDto);
            }


            // Return the next batch of articles to display, along with the ID of the last article in the batch
            return Ok(new
            {
                articles = articleDisplayDtos,
                HasNextPage = hasNextPage,
                NextCursor = nextCursor
            });
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

    }
}


