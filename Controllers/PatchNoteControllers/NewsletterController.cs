using System.Reflection;
using Hangfire;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Application.Services.NewsletterEmailService;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Helpers;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Api.Models.DTOs.Responses;
using System.Linq.Expressions;
using AutoMapper;
using PatchNote.Mapper;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
public class NewsletterController : Controller
{
    private readonly patchNoteDbContext _patchNoteDbContext;
    private readonly HangfireDbContext _hangfireDbContext;
    private readonly INewsletterEmailService _newsletterEmailService;
    private readonly IBackgroundJobClient _backgroundJobClient;

    private readonly IMapper _mapper;

    public NewsletterController(
                        patchNoteDbContext patchNoteDbContext,
                        HangfireDbContext hangfireDbContext,
                        INewsletterEmailService newsletterEmailService,
                        IBackgroundJobClient backgroundJobClient,
                        IMapper mapper)
    {
        _patchNoteDbContext = patchNoteDbContext;

        _hangfireDbContext = hangfireDbContext;

        _newsletterEmailService = newsletterEmailService;

        _backgroundJobClient = backgroundJobClient;

        _mapper = mapper;
    }

    // public void switchPublish(Newsletter newsletter, patchNoteDbContext _patchNoteDbContext )
    // {
    //     newsletter.IsPublished = 1;
    //     _patchNoteDbContext.SaveChangesAsync();
    // }

    [HttpGet("/newsletter", Name = "GetAllNewsletters")]
    public IActionResult GetAllNewsletters([FromQuery] NewsletterFilterParams filterParams)
    {

        IQueryable<Newsletter> newsletterQuery = _patchNoteDbContext.Newsletters
                                            .OrderByDescending(n => n.DateCreation);

        // -- apply filters by article type--
        newsletterQuery = filterParams.NewsletterState switch
        {
            "all" => newsletterQuery.OrderByDescending(n => n.DatePublication),
            "scheduled" => newsletterQuery.Where(n => n.IsBrouillon == 0 & n.DatePublication.Date > DateTime.Today),
            "published" => newsletterQuery.Where(n => n.IsBrouillon == 0 && n.DatePublication.Date <= DateTime.Today),
            "draft" => newsletterQuery.Where(n => n.IsBrouillon == 1),
            _ => newsletterQuery
        };
        // -- END --

        // -- apply sorting --
        var sortingOptions = new Dictionary<string, Expression<Func<Newsletter, object>>>
        {
            { "PublicationDate", n => n.DatePublication },
            { "ModificationDate", n => n.DateModification },
            { "Id", n => n.Id },
            { "Titre", n => n.TitreFR }
        };

        if (sortingOptions.ContainsKey(filterParams.SortColumn))
        {
            var sortExpression = sortingOptions[filterParams.SortColumn];
            newsletterQuery = filterParams.SortDirection ? newsletterQuery.OrderBy(sortExpression) : newsletterQuery.OrderByDescending(sortExpression);
        }
        // -- End Sorting -- 

        // Get total count of articles matching the filters
        var totalCount = newsletterQuery.Count();

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


        var newsletters = newsletterQuery
                    .Include(n => n.Articles)
                    .Skip((filterParams.Page - 1) * filterParams.Limit)
                    .Take(filterParams.Limit)
                    .ToList();

        if (newsletters == null)
        {
            return NotFound();
        }

        var newsletterDtos = new List<NewsletterDisplayDto>();

        foreach (var newsletter in newsletters)
        {

            var articles = _patchNoteDbContext.Articles
                .Where(a => a.NewsletterId == newsletter.Id
                            && a.IsBrouillon == 0
                            && a.IsArchive == 0
                            && a.DatePublication <= newsletter.DatePublication)
                .ToList();

            var newsletterDto = _mapper.Map<NewsletterDisplayDto>(newsletter);
            newsletterDto.Articles = _mapper.Map<List<NewsletterArticlesListDto>>(articles);

            newsletterDtos.Add(newsletterDto);
        }

        var response = new
        {
            Newsletter = new
            {
                newsletterData = newsletterDtos
            },
            Article = new
            {
                articles = newsletterDtos.SelectMany(n => n.Articles).ToList(),
                articlesCount = newsletterDtos.SelectMany(n => n.Articles).Count()
            },
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


    [HttpGet("/newsletter/{id}")]
    public async Task<ActionResult<Newsletter>> GetNewsletterById(int id)
    {
        var newsletter = await _patchNoteDbContext.Newsletters.FindAsync(id);

        if (newsletter == null)
        {
            return NotFound();
        }

        var articles = _patchNoteDbContext.Articles
        .Include(a => a.Categorie)
        .Include(a => a.Module)
            .Where(a => a.NewsletterId == newsletter.Id
                        && a.IsBrouillon == 0
                        && a.IsArchive == 0
                        && a.DatePublication <= newsletter.DatePublication)
            .ToList();



        var articlesWithNewsletter = _mapper.Map<List<NewsletterArticlesListDto>>(articles);


        var latestArticles = _patchNoteDbContext.Articles
                                .Where(a => a.IsBrouillon == 0
                                            && a.IsArchive == 0
                                            && a.NewsletterId == null
                                            && a.DatePublication <= DateTime.UtcNow.Date
                                            && a.DatePublication > DateTime.UtcNow.Date.AddDays(-15)
                                            && a.DatePublication <= newsletter.DatePublication)
                                .Select(a => new NewsletterArticlesListDto
                                {
                                    Id = a.Id,
                                    TitreFR = a.TitreFR,
                                    DatePublication = a.DatePublication.ToString("dd-MM-yyyy"),
                                    DatePublicationShort = a.DatePublication.ToString("dd-MM-yy")
                                })
                                .ToList();


        var oldArticles = _patchNoteDbContext.Articles
                                .Where(a => a.IsBrouillon == 0
                                            && a.IsArchive == 0
                                            && a.NewsletterId == null
                                            && a.DatePublication <= DateTime.UtcNow.Date.AddDays(-15)
                                            && a.DatePublication > DateTime.UtcNow.Date.AddDays(-30)
                                            && a.DatePublication <= newsletter.DatePublication)
                                .Select(a => new NewsletterArticlesListDto
                                {
                                    Id = a.Id,
                                    TitreFR = a.TitreFR,
                                    DatePublication = a.DatePublication.ToString("dd-MM-yyyy"),
                                    DatePublicationShort = a.DatePublication.ToString("dd-MM-yy")
                                })
                                .ToList();

        //get the total number of articles in the newsletter
        var articlesCount = articlesWithNewsletter.Count;

        var newsletterDisplayDto = _mapper.Map<NewsletterDisplayDto>(newsletter);
        newsletterDisplayDto.Articles = articlesWithNewsletter;


        var response = new
        {
            ArticlesCount = articlesCount,
            LatestArticles = latestArticles,
            OldArticles = oldArticles,
            Newsletter = newsletterDisplayDto,
        };

        return Ok(response);
    }


    [HttpPost]
    public async Task<ActionResult<Newsletter>> CreateNewsletter(Newsletter newsletter)
    {
        newsletter.DateCreation = DateTime.UtcNow;
        newsletter.DateModification = DateTime.UtcNow;


        _patchNoteDbContext.Newsletters.Add(newsletter);
        await _patchNoteDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetNewsletterById), new { id = newsletter.Id }, newsletter);
    }


    [HttpPut("/newsletter/update/{id}", Name = "UpdateNewsletterById")]
    public async Task<ActionResult<NewsletterUpdateDto>> UpdateNewsletterById(int id, NewsletterUpdateDto newsletterUpdateDto)
    {
        //Get this newsletter and all users to send email to
        var newsletter = _patchNoteDbContext.Newsletters.FirstOrDefault(a => a.Id == id);
        var users = await _patchNoteDbContext.Utilisateurs
                                .Where(x => x.Newsletter == 1)
                                .ToListAsync();

        if (newsletter == null)
        {
            return NotFound();
        }

        //Updating the newsletter content
        _mapper.Map(newsletterUpdateDto, newsletter);
        newsletter.DateModification = DateTime.UtcNow;

        _patchNoteDbContext.Newsletters.Update(newsletter);
        await _patchNoteDbContext.SaveChangesAsync();

        //For each user send an email with the newsletter content
        foreach (var user in users)
        {
            //Get the user language to send the right newsletter
            var userLanguage = user.Langue == null ? "FR" : user.Langue?.ToUpper();

            // If contact exists and have an id AND if contact has an email address AND if user Id  == 163569 -- this is my id "SOPHIE GILLARD"
            if (user.Id != null && user.Email != null)
            {

                //Send email only if scheduled date is today and if it has not been sent yet
                if (newsletter.IsPublished == 0 && newsletter.IsBrouillon == 0)
                {
                    var newsArticles = await ArticleHelper.GetArticlesByCategory(_patchNoteDbContext, newsletter.Id, 1);
                    var updatedArticles = await ArticleHelper.GetArticlesByCategory(_patchNoteDbContext, newsletter.Id, 2);
                    var fixedArticles = await ArticleHelper.GetArticlesByCategory(_patchNoteDbContext, newsletter.Id, 3);
                    var otherArticles = await ArticleHelper.GetArticlesByCategory(_patchNoteDbContext, newsletter.Id, 4);

                    var placeholders = new List<KeyValuePair<string, string>>();

                    // Read the HTML content of the article titles from a file
                    string articleTemplate = System.IO.File.ReadAllText("../PatchNote.Api/EmailTemplate/articleTemplate.html");
                    string newArticleTitles = "";
                    string updatedArticleTitles = "";
                    string fixedArticleTitles = "";
                    string otherArticleTitles = "";

                    //get template for if section is empty
                    string noArticleTemplate = System.IO.File.ReadAllText("../PatchNote.Api/EmailTemplate/noArticleTemplate.html");


                    // Get articles of each category (new feature, updates, bug fix and other). This function calls the content of the user's language.
                    foreach (var article in newsArticles)
                    {
                        newArticleTitles += ArticleHelper.GetNewslettersArticlesWithParams(userLanguage, article, articleTemplate);
                    }
                    if (newArticleTitles.Length == 0)
                    {
                        newArticleTitles = noArticleTemplate.Replace("{{noResultText}}", "Nothing new for the moment");

                    }

                    foreach (var article in updatedArticles)
                    {
                        updatedArticleTitles += ArticleHelper.GetNewslettersArticlesWithParams(userLanguage, article, articleTemplate);
                    }
                    if (updatedArticleTitles.Length == 0)
                    {
                        updatedArticleTitles = noArticleTemplate.Replace("{{noResultText}}", "No updates");

                    }

                    foreach (var article in fixedArticles)
                    {
                        fixedArticleTitles += ArticleHelper.GetNewslettersArticlesWithParams(userLanguage, article, articleTemplate);
                    }
                    if (fixedArticleTitles.Length == 0)
                    {
                        fixedArticleTitles = noArticleTemplate.Replace("{{noResultText}}", "You're working on correction");
                    }

                    foreach (var article in otherArticles)
                    {
                        otherArticleTitles += ArticleHelper.GetNewslettersArticlesWithParams(userLanguage, article, articleTemplate);
                    }
                    if (otherArticleTitles.Length == 0)
                    {
                        otherArticleTitles = noArticleTemplate.Replace("{{noResultText}}", "No other articles available.");
                    }


                    var newsletterTitle = ArticleHelper.GetTranslatedNewslettersTitle(userLanguage, newsletter);

                    Console.WriteLine(otherArticleTitles);
                    Console.WriteLine(otherArticleTitles.Length);

                    placeholders.Add(new KeyValuePair<string, string>("{{newArticles}}", newArticleTitles));
                    placeholders.Add(new KeyValuePair<string, string>("{{updatedArticles}}", updatedArticleTitles));
                    placeholders.Add(new KeyValuePair<string, string>("{{fixedArticles}}", fixedArticleTitles));
                    placeholders.Add(new KeyValuePair<string, string>("{{otherArticles}}", otherArticleTitles));
                    placeholders.Add(new KeyValuePair<string, string>("{{NewsletterTitle}}", newsletterTitle));
                    placeholders.Add(new KeyValuePair<string, string>("{{userId}}", user.Id.ToString()));



                    var email = new EmailDto
                    {
                        To = user.Email,
                        Subject = newsletterTitle,
                        PlaceHolders = placeholders
                    };




                    if (newsletter.JobId != null)
                    {
                        BackgroundJob.Delete(newsletter.JobId);
                    }

                    // ID instead of email 
                    var jobId = BackgroundJob.Schedule(() => _newsletterEmailService.SendEmail(email, userLanguage), newsletter.DatePublication);
                    newsletter.JobId = jobId;
                    await _patchNoteDbContext.SaveChangesAsync();

                    // BackgroundJob.ContinueJobWith(jobId, () =>
                    // switchPublish(newsletter, _patchNoteDbContext));
                }
            }
        }


        return Ok();
    }


    [HttpDelete("/newsletter/delete/{id}", Name = "DeleteNewsletterById")]
    public async Task<ActionResult<Newsletter>> DeleteNewsletterById(int id)

    {
        var newsletter = await _patchNoteDbContext.Newsletters.FindAsync(id);

        if (newsletter == null)
        {
            return NotFound();
        }

        _patchNoteDbContext.Newsletters.Remove(newsletter);
        await _patchNoteDbContext.SaveChangesAsync();

        return Ok(await _patchNoteDbContext.Newsletters.ToListAsync());

    }

}






