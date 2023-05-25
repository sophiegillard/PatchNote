// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using PatchNote.Api.Models.DTOs.Responses;
// using PatchNote.Api.Models.DTOs.Requests;
// using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
// using AutoMapper;
// using PatchNote.Api.Data.PatchNoteDatas.DBContext;

// namespace PatchNote.Application.Services
// {
//     public class ArticleService : IArticleService
//     {
//         private readonly patchNoteDbContext _patchNoteDbContext;
//         private readonly IMapper _mapper;

//         public ArticleService(patchNoteDbContext patchNoteDbContext, IMapper mapper)
//         {
//             _patchNoteDbContext = patchNoteDbContext;
//             _mapper = mapper;
//         }

//         public async Task<ArticleDisplayDto> GetArticleByIdAsync(int id)
//         {
//             var article = await _patchNoteDbContext.GetArticleByIdAsync(id);

//             if (article == null)
//             {
//                 return null;
//             }

//             var articleDisplayDto = _mapper.Map<ArticleDisplayDto>(article);
//             return articleDisplayDto;
//         }
//         public async Task<Article> AddArticleAsync(ArticleCreateDto articleCreateDto)
//         {
//             var article = _mapper.Map<Article>(articleCreateDto);
//             article.DateCreation = DateTime.UtcNow;
//             article.DateModification = DateTime.UtcNow;

//             await _patchNoteDbContext.AddArticleAsync(article);
//             return article;
//         }
//         public async Task<bool> UpdateArticleAsync(int id, ArticleUpdateDto articleUpdateDto)
//         {
//             var article = await _patchNoteDbContext.GetArticleByIdAsync(id);

//             if (article == null)
//             {
//                 return false;
//             }

//             _mapper.Map(articleUpdateDto, article);
//             article.DateModification = DateTime.UtcNow;

//             await _patchNoteDbContext.UpdateArticleAsync(article);
//             return true;
//         }
//         public async Task<bool> UpdateArticleNewsletterIdAsync(int id, ArticleNewsletterIdUpdateDto articleNewsletterIdUpdateDto)
//         {
//             var article = await _patchNoteDbContext.Articles.FirstOrDefaultAsync(a => a.Id == id);

//             if (article == null)
//             {
//                 return false;
//             }

//             article.NewsletterId = articleNewsletterIdUpdateDto.NewsletterId;

//             await _patchNoteDbContext.SaveChangesAsync();

//             return true;
//         }
//         public async Task<bool> DeleteArticleAsync(int id)
//         {
//             var article = await _patchNoteDbContext.GetArticleByIdAsync(id);

//             if (article == null)
//             {
//                 return false;
//             }

//             await _patchNoteDbContext.DeleteArticleAsync(article);
//             return true;
//         }
//     }

// }