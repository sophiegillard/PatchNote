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
    public class ArticleController : ControllerBase
    {
        private readonly patchNoteDbContext _patchNoteDbContext;
        private readonly ApschoolDbContext _apschoolDbContext;
        public ArticleController(patchNoteDbContext patchNoteDbContext, ApschoolDbContext apschoolDbContext)
        {
            _patchNoteDbContext = patchNoteDbContext;

            _apschoolDbContext = apschoolDbContext;
        }
      

        [HttpGet("{id}")]
        public IActionResult GetArticle(int id)
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

            var articleDisplayDto = new ArticleDisplayDto
            {
                Id = article.Id,
                TitreFR = article.TitreFR,
                ContenuFR = article.ContenuFR,
                TitreEN = article.TitreEN,
                ContenuEN = article.ContenuEN,
                TitreNL= article.TitreNL,
                ContenuNL = article.ContenuNL, 
                Categorie = article.Categorie.Nom,
                DatePublication = article.DatePublication.ToString("yyyy-MM-dd"), // format the date here
                Module = module?.nom
            };

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

            if(article == null)
            {
                return NotFound();
            }

            article.TitreFR = articleUpdateDto.TitreFR;
            article.ContenuFR = articleUpdateDto.ContenuFR;
            article.TitreEN = articleUpdateDto.TitreEN;
            article.ContenuEN = articleUpdateDto.ContenuEN;
            article.TitreNL = articleUpdateDto.TitreNL;
            article.ContenuNL = articleUpdateDto.ContenuNL;
            article.Version = articleUpdateDto.Version;
            article.DatePublication = articleUpdateDto.DatePublication;
            article.DateModification = DateTime.UtcNow;
            article.CategorieId = articleUpdateDto.CategorieId;
            article.ModuleId = articleUpdateDto.ModuleId;
            article.IsBrouillon = articleUpdateDto.IsBrouillon;

            _patchNoteDbContext.Articles.Update(article);
            await _patchNoteDbContext.SaveChangesAsync();

            return Ok();
        }


        //Update the newsletterId of an article
         [HttpPut("/article/updateNewsletterId/{id}", Name = "UpdateArticleNewsletterId")]
        public async Task<ActionResult<ArticleNewsletterIdUpdateDto>> UpdateArticleNewsletterId(int id, ArticleNewsletterIdUpdateDto articleNewsletterIdUpdateDto)
        {
            var article = _patchNoteDbContext.Articles.FirstOrDefault(a => a.Id == id);

            if(article == null)
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
            if(article == null)
            {
                return NotFound();
            }

            _patchNoteDbContext.Articles.Remove(article);
            await _patchNoteDbContext.SaveChangesAsync();

            return Ok(await _patchNoteDbContext.Articles.ToListAsync());
        }

    
    }
