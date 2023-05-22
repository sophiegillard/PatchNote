using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Helpers
{
   public static class ArticleHelper
    {
        public static async Task<List<NewsletterArticlesListDto>> GetArticlesByCategory(
            patchNoteDbContext dbContext, ApschoolDbContext apSchoolDbContext , int newsletterId, int categoryId)
        {
            var articlesWithNewsletter = await dbContext.Articles
                .Where(a => a.NewsletterId == newsletterId
                    && a.IsBrouillon == 0
                    && a.IsArchive == 0
                    && a.CategorieId == categoryId)
                .ToListAsync();

            var newsletterArticlesListDtos = new List<NewsletterArticlesListDto>();

            foreach (var a in articlesWithNewsletter)
            {
                var module = apSchoolDbContext.Modules
                    .FirstOrDefault(m => m.id == a.ModuleId);

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
                    Module = module?.nom
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
                        case "Messagerie":
                            return "Messagerie";
                        case "Réservation locaux":
                            return "Locaux";
                        case "Valves et news":
                            return "Actualités";
                        case "Distributeurs":
                            return "Distributeurs";
                        case "Évènements":
                            return "Évènements";
                        case "Plaines":
                            return "Centre Récréatif";
                        case "Garderie":
                            return "Extrascolaire";
                        case "Internat":
                            return "Internat";
                        case "Repas":
                            return "Réservation";
                        case "Webshop":
                            return "Webshop";
                        case "Financier":
                            return "Financier";
                        case "Coda":
                            return "Coda";
                        case "Pédagogique":
                            return "Pédagogique";
                        case "Discipline":
                            return "Discipline";
                        case "Absences":
                            return "Absences";
                        case "Bulletin":
                            return "Bulletin";
                        case "Suivi pédagogique":
                            return "Suivi pédagogique";
                        case "Réunions parents":
                            return "Réunions";
                        case "Journal de classe":
                            return "Journal de classe";
                        case "Ramassages":
                            return "Ramassages";
                        case "Pointages":
                            return "Pointages";
                        case "ISBW":
                            return "ISBW";
                        case "Importation":
                            return "Importation";
                        case "Retards":
                            return "Delays";
                        case "Debug":
                            return "Debug";
                        case "Journaux éducateurs":
                            return "Journaux éducateurs";
                        case "FWB":
                            return "FWB";
                        case "Recharge des comptes":
                            return "Recharge of accounts";
                        case "Paiement Digiteal":
                            return "Digiteal Payment";
                        case "Paiement Payzen":
                            return "Payzen Payment";
                        case "Paiement Mollie":
                            return "Mollie Payment";
                        default:
                            return module;
                    }

                case "EN":
                    switch (module)
                    {
                        case "Base":
                            return "Base";
                        case "Messagerie":
                            return "Mailbox";
                        case "Réservation locaux":
                            return "Classrooms";
                        case "Valves et news":
                            return "News";
                        case "Distributeurs":
                            return "Distributors";
                        case "Évènements":
                            return "Events";
                        case "Plaines":
                            return "Extracurricular activity";
                        case "Garderie":
                            return "Childcare";
                        case "Internat":
                            return "Internship";
                        case "Repas":
                            return "Reservation";
                        case "Webshop":
                            return "Webshop";
                        case "Financier":
                            return "Financial";
                        case "Coda":
                            return "Coda";
                        case "Pédagogique":
                            return "Pédagogical";
                        case "Discipline":
                            return "Discipline";
                        case "Absences":
                            return "Absences";
                        case "Bulletin":
                            return "Report card";
                        case "Suivi pédagogique":
                            return "Educational follow-upt";
                        case "Réunions parents":
                            return "Meetings";
                        case "Journal de classe":
                            return "Class journal";
                        case "Ramassages":
                            return "Pickups";
                        case "Pointages":
                            return "Check-in";
                        case "ISBW":
                            return "ISBW";
                        case "Importation":
                            return "Importation";
                        case "Retards":
                            return "Delays";
                        case "Debug":
                            return "Debug";
                        case "Journaux éducateurs":
                            return "Educators diaries";
                        case "FWB":
                            return "FWB";
                        case "Recharge des comptes":
                            return "Recharge of accounts";
                        case "Paiement Digiteal":
                            return "Digiteal Payment";
                        case "Paiement Payzen":
                            return "Payzen Payment";
                        case "Paiement Mollie":
                            return "Mollie Payment";
                        default:
                            return module;
                    }
                case "NL":
                    switch (module)
                    {
                        case "Base":
                            return "Baseren";
                        case "Messagerie":
                            return "Berichten";
                        case "Réservation locaux":
                            return "Lokalen";
                        case "Valves et news":
                            return "Nieuws";
                        case "Distributeurs":
                            return "Automaat";
                        case "Évènements":
                            return "Evenementen";
                        case "Plaines":
                            return "Buitenschoolse activiteit";
                        case "Garderie":
                            return "Kinderopvang";
                        case "Internat":
                            return "Internaat";
                        case "Repas":
                            return "Reservatie";
                        case "Webshop":
                            return "webshop";
                        case "Financier":
                            return "Financieel";
                        case "Coda":
                            return "coda";
                        case "Pédagogique":
                            return "pedagogisch";
                        case "Discipline":
                            return "Discipline";
                        case "Absences":
                            return "Afwezigheden";
                        case "Bulletin":
                            return "Rapport";
                        case "Suivi pédagogique":
                            return "Pedagogische begeleiding";
                        case "Réunions parents":
                            return "Vergadering";
                        case "Journal de classe":
                            return "School agenda";
                        case "Ramassages":
                            return "Inzamelingen";
                        case "Pointages":
                            return "Check-ins";
                        case "ISBW":
                            return "ISBW";
                        case "Importation":
                            return "Importeren";
                        case "Retards":
                            return "Telaten";
                        case "Debug":
                            return "Debuggen";
                        case "Journaux éducateurs":
                            return "Agendas van opvoeders";
                        case "FWB":
                            return "FWB";
                        case "Recharge des comptes":
                            return "Herlaad rekeningen";
                        case "Paiement Digiteal":
                            return "Digiteal betaling";
                        case "Paiement Payzen":
                            return "Payzen betaling";
                        case "Paiement Mollie":
                            return "Mollie betaling";
                        default:
                            return module.ToString();
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