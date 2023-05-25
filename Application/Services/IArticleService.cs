// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using PatchNote.Api.Models.DTOs.Responses;
// using PatchNote.Api.Models.DTOs.Requests;
// using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;


// namespace PatchNote.Application.Services
// {
//     public interface IArticleService
//     {
//         Task<ArticleDisplayDto> GetArticleByIdAsync(int id);
//         Task<Article> AddArticleAsync(ArticleCreateDto articleCreateDto);
//         Task<bool> UpdateArticleAsync(int id, ArticleUpdateDto articleUpdateDto);
//         Task<bool> UpdateArticleNewsletterIdAsync(int id, ArticleNewsletterIdUpdateDto articleNewsletterIdUpdateDto);
//         Task<bool> DeleteArticleAsync(int id);
//     }
// }