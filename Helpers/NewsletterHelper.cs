using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Helpers
{
    public static class ArticleHelper
    {
        public static async Task<List<NewsletterArticlesListDto>> GetArticlesByCategory(
            patchNoteDbContext dbContext, int newsletterId, int categoryId)
        {
            var articlesWithNewsletter = await dbContext.Articles
                .Include(a => a.Module)
                .Where(a => a.NewsletterId == newsletterId
                    && a.IsBrouillon == 0
                    && a.IsArchive == 0
                    && a.CategorieId == categoryId)
                .ToListAsync();

            var newsletterArticlesListDtos = new List<NewsletterArticlesListDto>();

            foreach (var a in articlesWithNewsletter)
            {

                var newsletterArticlesListDto = new NewsletterArticlesListDto
                {
                    Id = a.Id,
                    TitreFR = a.TitreFR,
                    TitreEN = a.TitreEN,
                    TitreNL = a.TitreNL,
                    DatePublication = a.DatePublication.ToString("dd-MM-yyyy"),
                    DatePublicationShort = a.DatePublication.ToString("dd-MM-yy"),
                    NewsletterId = a.NewsletterId,
                    CategorieId = a.CategorieId,
                    Module = a.Module?.Nom
                };

                newsletterArticlesListDtos.Add(newsletterArticlesListDto);
            }

            return newsletterArticlesListDtos;
        }


        private static string GetTranslatedModuleName(string userLanguage, string module)
        {
            switch (userLanguage)
            {
                case "FR":
                    switch (module)
                    {
                        case "Base":
                            return "Base";
                        case "Commande":
                            return "Commande";
                        case "Menu":
                            return "Menu";
                        case "Dashboard":
                            return "Dashboard";
                        case "Livraison":
                            return "Livraison";
                        case "Messagerie":
                            return "Messagerie";
                        case "Paiement":
                            return "Paiement";
                        case "Services":
                            return "Services";
                        case "Promotion":
                            return "Promotion";
                        case "Légilsation":
                            return "Légilsation";
                        case "Hygiène":
                            return "Hygiène";
                        case "Autre":
                            return "Autre";
                        default:
                            return module;
                    }

                case "EN":
                    switch (module)
                    {
                        case "Base":
                            return "Base";
                        case "Commande":
                            return "Order";
                        case "Menu":
                            return "Menu";
                        case "Dashboard":
                            return "Dashboard";
                        case "Livraison":
                            return "Delivery";
                        case "Messagerie":
                            return "Messaging";
                        case "Paiement":
                            return "Payment";
                        case "Services":
                            return "Services";
                        case "Promotion":
                            return "Promotion";
                        case "Légilsation":
                            return "Legislation";
                        case "Hygiène":
                            return "Hygiene";
                        case "Autre":
                            return "Other";
                        default:
                            return module;
                    }
                case "NL":
                    switch (module)
                    {
                        case "Base":
                            return "Basis";
                        case "Commande":
                            return "Bestelling";
                        case "Menu":
                            return "Menu";
                        case "Dashboard":
                            return "Dashboard";
                        case "Livraison":
                            return "Levering";
                        case "Messagerie":
                            return "Berichten";
                        case "Paiement":
                            return "Betaling";
                        case "Services":
                            return "Diensten";
                        case "Promotion":
                            return "Promotie";
                        case "Légilsation":
                            return "Wetgeving";
                        case "Hygiène":
                            return "Hygiëne";
                        case "Autre":
                            return "Overig";
                        default:
                            return module;
                    }
                default:
                    return module;
            }
        }

        public static string GetNewslettersArticlesWithParams(string userLanguage, NewsletterArticlesListDto article, string articleTemplate)
        {
            string translatedArticleTitle;

            switch (userLanguage)
            {
                case "FR":
                    translatedArticleTitle = article.TitreFR;
                    break;
                case "EN":
                    translatedArticleTitle = article.TitreEN;
                    break;
                case "NL":
                    translatedArticleTitle = article.TitreNL;
                    break;
                default:
                    translatedArticleTitle = article.TitreFR; // Default to French if language not recognized
                    break;
            }

            return articleTemplate
                .Replace("{{ArticleTitle}}", translatedArticleTitle)
                .Replace("{{ArticleDate}}", article.DatePublication)
                .Replace("{{ArticleCategory}}", GetTranslatedModuleName(userLanguage, article.Module));
        }

        public static string GetTranslatedNewslettersTitle(string userLanguage, Newsletter newsletter)
        {
            string translatedNewsletterTitle;

            switch (userLanguage)
            {
                case "FR":
                    translatedNewsletterTitle = newsletter.TitreFR;
                    break;
                case "EN":
                    translatedNewsletterTitle = newsletter.TitreEN;
                    break;
                case "NL":
                    translatedNewsletterTitle = newsletter.TitreNL;
                    break;
                default:
                    translatedNewsletterTitle = newsletter.TitreFR; // Default to French if language not recognized
                    break;
            }

            return translatedNewsletterTitle;
        }

    }

}