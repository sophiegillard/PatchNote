using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Mapper;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
public class ArticleController : ControllerBase
{
    private readonly patchNoteDbContext _patchNoteDbContext;
    private readonly IMapper _mapper;
    public ArticleController(patchNoteDbContext patchNoteDbContext, IMapper mapper)
    {
        _patchNoteDbContext = patchNoteDbContext;
        _mapper = mapper;
    }


    [HttpGet("{id}")]
    public IActionResult GetArticle(int id)
    {
        var article = _patchNoteDbContext.Articles
                    .Include(a => a.Categorie)
                    .Include(a => a.Module)
                    .FirstOrDefault(a => a.Id == id);

        if (article == null)
        {
            return NotFound();
        }

        var articleDisplayDto = _mapper.Map<ArticleDisplayDto>(article);

        return Ok(articleDisplayDto);
    }

    [HttpPost]
    public async Task<ActionResult<Article>> AddArticle(Article article)
    {
        article.DateCreation = DateTime.UtcNow;
        article.DateModification = DateTime.UtcNow;


        _patchNoteDbContext.Articles.Add(article);
        await _patchNoteDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetArticle), new { id = article.Id }, article);
    }


    [HttpPut("/article/update/{id}", Name = "UpdateArticleById")]
    public async Task<ActionResult<ArticleUpdateDto>> UpdateArticle(int id, ArticleUpdateDto articleUpdateDto)
    {
        var article = _patchNoteDbContext.Articles.FirstOrDefault(a => a.Id == id);

        if (article == null)
        {
            return NotFound();
        }

        // Apply mapping
        _mapper.Map(articleUpdateDto, article);

        article.DateModification = DateTime.UtcNow;

        _patchNoteDbContext.Articles.Update(article);
        await _patchNoteDbContext.SaveChangesAsync();

        return Ok();
    }


    //Update the newsletterId of an article
    [HttpPut("/article/updateNewsletterId/{id}", Name = "UpdateArticleNewsletterId")]
    public async Task<ActionResult<ArticleNewsletterIdUpdateDto>> UpdateArticleNewsletterId(int id, ArticleNewsletterIdUpdateDto articleNewsletterIdUpdateDto)
    {
        var article = _patchNoteDbContext.Articles.FirstOrDefault(a => a.Id == id);

        if (article == null)
        {
            return NotFound();
        }

        article.NewsletterId = articleNewsletterIdUpdateDto.NewsletterId;

        _patchNoteDbContext.Articles.Update(article);
        await _patchNoteDbContext.SaveChangesAsync();

        return Ok();
    }


    [HttpDelete("/article/delete/{id}", Name = "DeleteArticleById")]
    public async Task<ActionResult<Article>> DeleteArticle(int id)
    {
        var article = await _patchNoteDbContext.Articles.FindAsync(id);
        if (article == null)
        {
            return NotFound();
        }

        _patchNoteDbContext.Articles.Remove(article);
        await _patchNoteDbContext.SaveChangesAsync();

        return Ok(await _patchNoteDbContext.Articles.ToListAsync());
    }


}
