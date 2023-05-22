using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Application.Services.NewsletterEmailService
{
    public interface INewsletterEmailService
    {
        // void CheckAndSendNewsletter();
        Task SendEmail(EmailDto request, string userLanguage);


    }
}