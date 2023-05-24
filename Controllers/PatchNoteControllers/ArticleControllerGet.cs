using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Models.DTOs.Requests;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
public class ArticleGetController : ControllerBase
{
    private readonly patchNoteDbContext _patchNoteDbContext;
    private readonly ApschoolDbContext _apschoolDbContext;
    public ArticleGetController(patchNoteDbContext patchNoteDbContext, ApschoolDbContext apschoolDbContext)
    {
        _patchNoteDbContext = patchNoteDbContext;

        _apschoolDbContext = apschoolDbContext;
    }


    [HttpGet("/article", Name = "GetArticles")]
    public IActionResult GetArticles()
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

            var articleDisplayDto = new ArticleDisplayDto
            {
                Id = article.Id,
                TitreFR = article.TitreFR,
                ContenuFR = article.ContenuFR,
                TitreEN = article.TitreEN,
                ContenuEN = article.ContenuEN,
                TitreNL = article.TitreNL,
                ContenuNL = article.ContenuNL,
                Categorie = article?.Categorie?.Nom,
                DatePublication = article?.DatePublication.ToString("yyyy-MM-dd"), // format the date here
                Module = article?.Module?.Nom,
                NewsletterId = article?.NewsletterId
            };

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

        switch (filterParams.FilterType)
        {
            case "all":
                articlesQuery = articlesQuery.OrderByDescending(a => a.DatePublication);
                break;
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

        if (filterParams.CategoryId.HasValue)
        {
            articlesQuery = articlesQuery.Where(a => a.CategorieId == filterParams.CategoryId.Value);
        }

        if (filterParams.ModuleId.HasValue)
        {
            articlesQuery = articlesQuery.Where(a => a.ModuleId == filterParams.ModuleId.Value);
        }

        if (filterParams.StartDate.HasValue)
        {
            var searchStartDate = filterParams.StartDate.Value.Date;
            articlesQuery = articlesQuery.Where(a => a.DatePublication.Date >= searchStartDate);
        }

        if (filterParams.EndDate.HasValue)
        {
            var searchEndDate = filterParams.EndDate.Value.Date.AddDays(1).AddTicks(-1);
            articlesQuery = articlesQuery.Where(a => a.DatePublication.Date <= searchEndDate);
        }

        // apply sorting
        if (filterParams.SortColumn == "PublicationDate")
        {
            if (filterParams.SortDirection)
            {
                articlesQuery = articlesQuery.OrderBy(a => a.DatePublication);
            }
            else
            {
                articlesQuery = articlesQuery.OrderByDescending(a => a.DatePublication);
            }
        }
        if (filterParams.SortColumn == "ModificationDate")
        {
            if (filterParams.SortDirection)
            {
                articlesQuery = articlesQuery.OrderBy(a => a.DateModification);
            }
            else
            {
                articlesQuery = articlesQuery.OrderByDescending(a => a.DateModification);
            }
        }
        else if (filterParams.SortColumn == "Id")
        {
            if (filterParams.SortDirection)
            {
                articlesQuery = articlesQuery.OrderBy(a => a.Id);
            }
            else
            {
                articlesQuery = articlesQuery.OrderByDescending(a => a.Id);
            }
        }
        else if (filterParams.SortColumn == "Titre")
        {
            if (filterParams.SortDirection)
            {
                articlesQuery = articlesQuery.OrderBy(a => a.TitreFR);
            }
            else
            {
                articlesQuery = articlesQuery.OrderByDescending(a => a.TitreFR);
            }
        }

        // Get total count of articles matching the filters
        var totalCount = articlesQuery.Count();

        // Calculate pagination details based on total count and page size
        var totalPages = (int)Math.Ceiling((double)totalCount / filterParams.Limit);
        var currentPage = filterParams.Page;
        if (currentPage < 1)
        {
            currentPage = 1;
        }
        if (currentPage > totalPages)
        {
            currentPage = totalPages;
        }
        var startRow = (currentPage - 1) * filterParams.Limit + 1;
        var endRow = Math.Min(startRow + filterParams.Limit - 1, totalCount);

        var articles = articlesQuery
        .Include(a => a.Categorie)
        .Skip((filterParams.Page - 1) * filterParams.Limit)
        .Take(filterParams.Limit)
        .ToList();





        if (articles == null)
        {
            return NotFound();
        }


        // Map articles to DTOs
        var articleDetailsDisplayDtos = articles.Select(article => new ArticleDetailsDisplayDto
        {
            Id = article.Id,
            TitreFR = article.TitreFR,
            DescriptionFR = article.ContenuFR,
            Categorie = article?.Categorie?.Nom,
            DatePublication = article.DatePublication.ToString("yyyy-MM-dd"),
            DateModification = article.DateModification.ToString("dd-MM-yyyy"),
            Module = _apschoolDbContext.Modules.FirstOrDefault(m => m.id == article.ModuleId)?.nom,
            AuteurId = article.AuteurId,
            Version = article.Version,
            IsBrouillon = article.IsBrouillon,
            IsArchive = article.IsArchive,
            IsNew = (DateTime.Today - article.DatePublication.Date).TotalDays <= 15 // Check if article is new
        }).ToList();

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
                                                                            string? search, int userId)
    {
        var utilisateurModules = _apschoolDbContext.Utilisateurs
        .Include(u => u.EcoleAuxiliaire)
            .ThenInclude(ea => ea.Ecole)
        .Include(u => u.EcoleAuxiliaire.EcoleAuxiliaireModules)
            .ThenInclude(eam => eam.Module)
        .SingleOrDefault(u => u.Id == userId)
        ?.EcoleAuxiliaire
        ?.EcoleAuxiliaireModules
        ?.Select(eam => eam.Module);

        var arrayModules = utilisateurModules.Select(m => m.id).ToArray();
        var moduleIds = utilisateurModules.Select(m => m.id).ToList();

        IQueryable<Article> articlesQuery = _patchNoteDbContext.Articles
                                                .OrderByDescending(a => a.DatePublication)
                                                .Where(a => a.IsBrouillon == 0 && a.IsArchive == 0 && a.DatePublication.Date <= DateTime.Today)
                                                .Where(a => moduleIds.Contains(a.ModuleId)); // Filter by module ID

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


        if (filterParams.CategoryId.HasValue)
        {
            articlesQuery = articlesQuery.Where(a => a.CategorieId == filterParams.CategoryId.Value);
        }

        if (filterParams.ModuleId.HasValue)
        {
            articlesQuery = articlesQuery.Where(a => a.ModuleId == filterParams.ModuleId.Value);
        }

        if (filterParams.StartDate.HasValue)
        {
            var searchStartDate = filterParams.StartDate.Value.Date;
            articlesQuery = articlesQuery.Where(a => a.DatePublication.Date >= searchStartDate);
        }

        if (filterParams.EndDate.HasValue)
        {
            var searchEndDate = filterParams.EndDate.Value.Date.AddDays(1).AddTicks(-1);
            articlesQuery = articlesQuery.Where(a => a.DatePublication.Date <= searchEndDate);
        }




        // Apply pagination
        int page = _page ?? 1;
        int limit = _limit ?? 10;
        int offset = (page - 1) * limit;
        articlesQuery = articlesQuery.Skip(offset).Take(limit);

        // Execute the query and get the articles           
        var articles = await articlesQuery
        .Include(a => a.Categorie)
        .Skip((filterParams.Page - 1) * filterParams.Limit)
        .Take(filterParams.Limit)
        .ToListAsync();

        if (articles == null)
        {
            return NotFound();
        }



        // Map articles to DTOs
        var articleDetailsDisplayDtos = articles.Select(article => new ArticleDetailsDisplayDto
        {
            Id = article.Id,
            TitreFR = article.TitreFR,
            DescriptionFR = article.ContenuFR,
            TitreEN = article.TitreEN,
            DescriptionEN = article.ContenuEN,
            TitreNL = article.TitreNL,
            DescriptionNL = article.ContenuNL,
            Categorie = article?.Categorie?.Nom,
            DatePublication = article.DatePublication.ToString("dd-MM-yyyy"), // format the date
            Module = _apschoolDbContext.Modules.FirstOrDefault(m => m.id == article.ModuleId)?.nom,
            AuteurId = article.AuteurId,
            Version = article.Version,
            IsBrouillon = article.IsBrouillon,
            IsArchive = article.IsArchive,
            IsNew = (DateTime.Today - article.DatePublication.Date).TotalDays <= 15 // Check if article is new
        }).ToList();

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
            modules = arrayModules
        });
    }


    //Get article details by Id
    [HttpGet("/article/details/{id}", Name = "GetDetailedArticlesById")]
    public IActionResult GetDetailedArticleById(int id)
    {
        var article = _patchNoteDbContext.Articles
                    .Include(a => a.Categorie)
                    .FirstOrDefault(a => a.Id == id);

        if (article == null)
        {
            return NotFound();
        }

        var module = _apschoolDbContext.Modules
            .FirstOrDefault(m => m.id == article.ModuleId);

        var utilisateur = _apschoolDbContext.Utilisateurs
            .FirstOrDefault(u => u.Id == article.AuteurId);

        var articleAdminDetailsDisplayDto = new ArticleAdminDetailsDisplayDto
        {
            Id = article.Id,
            TitreFR = article.TitreFR,
            ContenuFR = article.ContenuFR,
            TitreEN = article.TitreEN,
            ContenuEN = article.ContenuEN,
            TitreNL = article.TitreNL,
            ContenuNL = article.ContenuNL,
            Version = article.Version,
            Categorie = article.Categorie?.Nom,
            DatePublication = article.DatePublication.ToString("dd-MM-yyyy"),
            DateModification = article.DateModification.ToString("dd-MM-yyyy"),
            Module = module?.nom,
            CategorieId = article.Categorie.Id,
            ModuleId = module.id,
            Auteur = utilisateur?.Nom + " " + utilisateur?.Prenom,
            IsBrouillon = article.IsBrouillon,
            IsArchive = article.IsArchive
        };

        return Ok(articleAdminDetailsDisplayDto);
    }


    //Get only newsletterId of the article
    [HttpGet("/article/newsletterId", Name = "GetArticlesNewsletterId")]
    public IActionResult GetArticlesNewsletterId()
    {
        var articles = _patchNoteDbContext.Articles
                    .Include(a => a.Categorie)
                    .ToList();

        if (articles == null)
        {
            return NotFound();
        }

        var articleNewsletterIdDisplayDtos = new List<ArticleNewsletterIdDisplayDto>();

        foreach (var article in articles)
        {
            var module = _apschoolDbContext.Modules
                        .FirstOrDefault(m => m.id == article.ModuleId);

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
