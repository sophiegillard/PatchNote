
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using PatchNote.Api.Models.DTOs.Requests;
using MimeKit.Text;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.ApschoolDatas.DBContext;

namespace PatchNote.Api.Application.Services.NewsletterEmailService
{
    public class NewsletterEmailService : INewsletterEmailService
    {
        private readonly IConfiguration _config;
        private readonly patchNoteDbContext _patchNoteDbContext;
        private readonly ApschoolDbContext _apschoolDbContext;

        public NewsletterEmailService(IConfiguration config, patchNoteDbContext patchNoteDbContext, ApschoolDbContext apschoolDbContext)
        {
            _config = config;
            _patchNoteDbContext = patchNoteDbContext;
            _apschoolDbContext = apschoolDbContext;
        }


        private TextPart UpdatePlaceHolders(TextPart body, List<KeyValuePair<string, string>> keyValuePairs)
        {
            if (keyValuePairs != null)
            {
                foreach (var placeholder in keyValuePairs)
                {
                    if (body.Text.Contains(placeholder.Key))
                    {
                        body.Text = body.Text.Replace(placeholder.Key, placeholder.Value);
                    }
                }
            }

            return body;
        }

        public async Task SendEmail(EmailDto request, string userLanguage)
        {
            // Load the HTML body from file
            string templateFilePath;
            switch (userLanguage)
            {
                case "FR":
                    templateFilePath = "../PatchNote.Api/EmailTemplate/newsletterBodyFR.html";
                    break;
                case "EN":
                    templateFilePath = "../PatchNote.Api/EmailTemplate/newsletterBodyEN.html";
                    break;
                case "NL":
                    templateFilePath = "../PatchNote.Api/EmailTemplate/newsletterBodyNL.html";
                    break;
                // Add more cases for other languages as needed
                default:
                    templateFilePath = "../PatchNote.Api/EmailTemplate/newsletterBodyFR.html";
                    break;
            }
            string htmlBody = File.ReadAllText(templateFilePath);


            // create a new TextPart object to hold the HTML-formatted body text
            var body = new TextPart(TextFormat.Html)
            {
                Text = htmlBody
            };

            body = UpdatePlaceHolders(body, request.PlaceHolders);


            // Construct the email message based on the properties of the newsletter object
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUserName").Value));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;
            email.Body = body;
            // email.Body = new TextPart(TextFormat.Html) { Text = request.Body };

            // Send the email using MailKit
            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_config.GetSection("EmailHost").Value, _config.GetValue<int>("EmailPort"), SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(
                    _config.GetSection("EmailUserName").Value,
                    _config.GetSection("EmailPassword").Value);
            await smtp.SendAsync(email);
            await smtp.DisconnectAsync(true);

            // newsletter.IsPublished = 1;
        }

    }
}