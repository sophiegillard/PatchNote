using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Models.DTOs.Requests;
using System.Linq.Expressions;
using PatchNote.Mapper;


namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
public class ArticleControllerGet : ControllerBase
{

    private readonly patchNoteDbContext _patchNoteDbContext;
    private readonly IMapper _mapper;


    public ArticleControllerGet(patchNoteDbContext patchNoteDbContext, IMapper mapper)
    {
        _patchNoteDbContext = patchNoteDbContext;
        _mapper = mapper;
    }


    [HttpGet("/article", Name = "GetAllArticles")]
    public IActionResult GetAllArticles()
    {
        var articles = _patchNoteDbContext.Articles
                    .Include(a => a.Categorie)
                    .Include(a => a.Module)
                    .OrderByDescending(a => a.DatePublication)
                    .ToList();

        if (articles == null)
        {
            return NotFound();
        }

        var articleDisplayDtos = new List<ArticleDisplayDto>();

        foreach (var article in articles)
        {

            var articleDisplayDto = _mapper.Map<ArticleDisplayDto>(article);
            articleDisplayDtos.Add(articleDisplayDto);
        }

        return Ok(articleDisplayDtos);
    }


    //Get articles details with pagination
    [HttpGet("/article/details", Name = "GetDetailedArticles")]
    public IActionResult GetDetailedArticles([FromQuery] ArticleFilterParams filterParams)
    {

        IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
                                             .OrderByDescending(a => a.Id);

        // -- apply filters by article type--
        articlesQuery = filterParams.FilterType switch
        {
            "all" => articlesQuery.OrderByDescending(a => a.DatePublication),
            "scheduled" => articlesQuery.Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date > DateTime.Today),
            "published" => articlesQuery.Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today),
            "draft" => articlesQuery.Where(a => a.IsBrouillon == 1 && a.IsArchive == 0),
            "archive" => articlesQuery.Where(a => a.IsArchive == 1),
            _ => articlesQuery
        };
        // -- END --

        // -- apply filters --
        articlesQuery = articlesQuery
        .Where(a => !filterParams.CategoryId.HasValue || a.CategorieId == filterParams.CategoryId.Value)
        .Where(a => !filterParams.ModuleId.HasValue || a.ModuleId == filterParams.ModuleId.Value)
        .Where(a => !filterParams.StartDate.HasValue || a.DatePublication.Date >= filterParams.StartDate.Value.Date)
        .Where(a => !filterParams.EndDate.HasValue || a.DatePublication.Date <= filterParams.EndDate.Value.Date.AddDays(1).AddTicks(-1));
        // -- END --

        // -- apply sorting --
        var sortingOptions = new Dictionary<string, Expression<Func<Article, object>>>
        {
            { "PublicationDate", a => a.DatePublication },
            { "ModificationDate", a => a.DateModification },
            { "Id", a => a.Id },
            { "Titre", a => a.TitreFR }
        };

        if (sortingOptions.ContainsKey(filterParams.SortColumn))
        {
            var sortExpression = sortingOptions[filterParams.SortColumn];
            articlesQuery = filterParams.SortDirection ? articlesQuery.OrderBy(sortExpression) : articlesQuery.OrderByDescending(sortExpression);
        }
        // -- End Sorting -- 

        // Calculate pagination details
        // Get total count of articles matching the filters
        var totalCount = articlesQuery.Count();

        // Calculate pagination details based on total count and page size
        var totalPages = (int)Math.Ceiling((double)totalCount / filterParams.Limit);
        // var currentPage = filterParams.Page;

        // if (currentPage < 1)
        // {
        //     currentPage = 1;
        // }
        // if (currentPage > totalPages)
        // {
        //     currentPage = totalPages;
        // }
        var currentPage = Math.Clamp(filterParams.Page, 1, totalPages);
        // -- End  -- 

        var articles = articlesQuery
        .Include(a => a.Categorie)
        .Include(a => a.Module)
        .Skip((filterParams.Page - 1) * filterParams.Limit)
        .Take(filterParams.Limit)
        .ToList();

        if (articles == null)
        {
            return NotFound();
        }

        // Map articles to DTOs
        var articleDetailsDisplayDtos = new List<ArticleDetailsDisplayDto>();

        foreach (var article in articles)
        {
            var articleDetailsDisplayDto = _mapper.Map<ArticleDetailsDisplayDto>(article);
            articleDetailsDisplayDto.IsNew = (DateTime.Today - article.DatePublication.Date).TotalDays <= 15;
            articleDetailsDisplayDtos.Add(articleDetailsDisplayDto);
        }

        // Build response object containing both the articles and pagination details
        var response = new
        {
            Articles = articleDetailsDisplayDtos,
            Pagination = new
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                Limit = filterParams.Limit,
                Page = filterParams.Page
            },
            Sort = new
            {
                Column = filterParams.SortColumn,
                Direction = filterParams.SortDirection
            }
        };
        return Ok(response);
    }


    // Get articles details with load more
    [HttpGet("/article/details/loadMore", Name = "GetDetailedArticlesLodedMore")]
    public async Task<IActionResult> GetDetailedArticlesLodedMoreAsync([FromQuery] ArticleFilterParams filterParams,
                                                                            int? _page,
                                                                            int? _limit,
                                                                            string? search)
    {
        IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
                                                .OrderByDescending(a => a.DatePublication)
                                                .Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today);

        // Add search filter
        if (!string.IsNullOrEmpty(search))
        {
            articlesQuery = articlesQuery.Where(a => a.TitreFR.Contains(search) || a.ContenuFR.Contains(search));
            articlesQuery = articlesQuery.Where(a => a.TitreFR.ToLower().Contains(search.ToLower())
                        || a.TitreEN.ToLower().Contains(search.ToLower())
                        || a.TitreNL.ToLower().Contains(search.ToLower())
                        || a.ContenuFR.ToLower().Contains(search.ToLower())
                        || a.ContenuEN.ToLower().Contains(search.ToLower())
                        || a.ContenuNL.ToLower().Contains(search.ToLower()));
        }


        // -- apply filters --
        articlesQuery = articlesQuery
        .Where(a => !filterParams.CategoryId.HasValue || a.CategorieId == filterParams.CategoryId.Value)
        .Where(a => !filterParams.ModuleId.HasValue || a.ModuleId == filterParams.ModuleId.Value)
        .Where(a => !filterParams.StartDate.HasValue || a.DatePublication.Date >= filterParams.StartDate.Value.Date)
        .Where(a => !filterParams.EndDate.HasValue || a.DatePublication.Date <= filterParams.EndDate.Value.Date.AddDays(1).AddTicks(-1));
        // -- END --


        // Apply pagination load more 
        int page = _page ?? 1;
        int limit = _limit ?? 10;
        int offset = (page - 1) * limit;
        articlesQuery = articlesQuery.Skip(offset).Take(limit);

        // Execute the query and get the articles           
        var articles = await articlesQuery
        .Include(a => a.Categorie)
        .Include(a => a.Module)
        .Skip((filterParams.Page - 1) * filterParams.Limit)
        .Take(filterParams.Limit)
        .ToListAsync();

        if (articles == null)
        {
            return NotFound();
        }


        // Map articles to DTOs
        var articleDetailsDisplayDtos = new List<ArticleDetailsDisplayDto>();

        foreach (var article in articles)
        {
            var articleDetailsDisplayDto = _mapper.Map<ArticleDetailsDisplayDto>(article);
            articleDetailsDisplayDto.IsNew = (DateTime.Today - article.DatePublication.Date).TotalDays <= 15;
            articleDetailsDisplayDtos.Add(articleDetailsDisplayDto);
        }


        // Get the total count of messages for pagination
        int totalCount = _patchNoteDbContext.Articles.Count();

        // Calculate pagination values
        int totalPages = (int)Math.Ceiling((double)totalCount / limit);
        int? nextPage = page < totalPages ? page + 1 : null;
        int? previousPage = page > 1 ? page - 1 : null;

        // Return the messages as JSON with pagination information in the response body
        return Ok(new
        {
            totalCount = totalCount,
            totalPages = totalPages,
            currentPage = page,
            nextPage = nextPage,
            previousPage = previousPage,
            data = articleDetailsDisplayDtos,
        });
    }


    //Get article details by Id
    [HttpGet("/article/details/{id}", Name = "GetDetailedArticlesById")]
    public IActionResult GetDetailedArticleById(int id)
    {
        var article = _patchNoteDbContext.Articles
                    .Include(a => a.Categorie)
                    .Include(a => a.Module)
                    .FirstOrDefault(a => a.Id == id);

        if (article == null)
        {
            return NotFound();
        }

        var utilisateur = _patchNoteDbContext.Utilisateurs
            .FirstOrDefault(u => u.Id == article.AuteurId);

        var articleAdminDetailsDisplayDto = _mapper.Map<ArticleAdminDetailsDisplayDto>(article);
        articleAdminDetailsDisplayDto.Auteur = utilisateur?.Nom + " " + utilisateur?.Prenom;

        return Ok(articleAdminDetailsDisplayDto);
    }


    //Get only newsletterId of the article
    [HttpGet("/article/newsletterId", Name = "GetArticlesNewsletterId")]
    public IActionResult GetArticlesNewsletterId()
    {
        var articles = _patchNoteDbContext.Articles
                    .Include(a => a.Categorie)
                    .Include(a => a.Module)
                    .ToList();

        if (articles == null)
        {
            return NotFound();
        }

        var articleNewsletterIdDisplayDtos = new List<ArticleNewsletterIdDisplayDto>();

        foreach (var article in articles)
        {

            var articleNewsletterIdDisplayDto = new ArticleNewsletterIdDisplayDto
            {
                Id = article.Id,
                TitreFR = article.TitreFR,
                NewsletterId = article.NewsletterId
            };

            articleNewsletterIdDisplayDtos.Add(articleNewsletterIdDisplayDto);
        }

        return Ok(articleNewsletterIdDisplayDtos);
    }

}
