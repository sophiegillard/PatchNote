using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

namespace PatchNote.Api.Controllers.PatchNoteControllers
{
    [Route("[controller]")]

    public class IdentifiantController : Controller
    {
        private readonly patchNoteDbContext _patchNoteDbContext;
        public IdentifiantController(patchNoteDbContext patchNoteDbContext)
        {
            _patchNoteDbContext = patchNoteDbContext;
        }


        [HttpGet]
        public IEnumerable<Identifiant> Get()
        {
            var identif = _patchNoteDbContext.Identifiants
            .Select(c => new Identifiant
            {
                Id = c.Id,
                UserName = c.UserName,
                UtilisateurId = c.UtilisateurId,
                Utilisateur = c.Utilisateur,
            });

            return identif;
        }
    }
}