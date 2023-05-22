
using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.ApschoolDatas.Entities;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Controllers.ApschoolControllers;

[ApiController]
[Route("[controller]")]
public class UtilisateurController : ControllerBase
{
    private readonly ApschoolDbContext _apschoolDbContext;
    public UtilisateurController(ApschoolDbContext apschoolDbContext)
    {
        this._apschoolDbContext = apschoolDbContext;
    }

    [HttpGet]
    public IEnumerable<Utilisateur> Get()
    {
        return _apschoolDbContext.Utilisateurs.Take(10);
    }


    [HttpGet("/UserContactDetails", Name = "GetUserContactDetails")]
    public IActionResult GetUserContactDetails()
    {
        var users = _apschoolDbContext.Utilisateurs.Where(x => 
        x.TypeUtilisateur > 6  && x.TypeUtilisateur < 10
        // && x.Newsletter == 1
        ).ToList();


        var UtilisateurDtos = new List<UtilisateurDto>();

        foreach(var user in users)
        {
            var contact = _apschoolDbContext.Contacts
                        .FirstOrDefault(x => x.utilisateur_id == user.Id);

            if (contact?.email != null) {
                var UtilisateurDto = new UtilisateurDto
                {
                    Id = user.Id,
                    Nom = user.Nom,
                    Prenom = user.Prenom,
                    TypeUtilisateur = user.TypeUtilisateur,
                    newsletter = user.Newsletter,
                    langue = user.Langue,
                    email = contact.email
                };
                UtilisateurDtos.Add(UtilisateurDto);
            }
            
        }


        return Ok(UtilisateurDtos);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Utilisateur>> GetArticle(int id)
    {
         try
            {
                var result = await _apschoolDbContext.Utilisateurs.FindAsync(id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
    }

    //unsubscribe Newsletter
     [HttpPut("/user/unsubscribeNewsletter/{id}", Name = "unsubscribeNewsletter")]
        public async Task<ActionResult<UserUpdateNewsletterSubscriptionDto>> UnsubscribeNewsletter (int id, UserUpdateNewsletterSubscriptionDto articleNewsletterIdUpdateDto)
        {
            var user = _apschoolDbContext.Utilisateurs.FirstOrDefault(a => a.Id == id);

            if(user == null)
            {
                return NotFound();
            }

            user.Newsletter = 1;

            _apschoolDbContext.Utilisateurs.Update(user);
            await _apschoolDbContext.SaveChangesAsync();

            return Ok();
        }

    //subscribe Newsletter
     [HttpPut("/user/subscribeNewsletter/{id}", Name = "subscribeNewsletter")]
        public async Task<ActionResult<UserUpdateNewsletterSubscriptionDto>> SubscribeNewsletter (int id, UserUpdateNewsletterSubscriptionDto articleNewsletterIdUpdateDto)
        {
            var user = _apschoolDbContext.Utilisateurs.FirstOrDefault(a => a.Id == id);

            if(user == null)
            {
                return NotFound();
            }

            user.Newsletter = 0;

            _apschoolDbContext.Utilisateurs.Update(user);
            await _apschoolDbContext.SaveChangesAsync();

            return Ok();
        }
}