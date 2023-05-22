using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
    public class StatutMessageRecommandationController : Controller
    {
    
        private readonly patchNoteDbContext _patchNoteDbContext;
        public StatutMessageRecommandationController(patchNoteDbContext patchNoteDbContext)
        {
            this._patchNoteDbContext = patchNoteDbContext;
        }


        [HttpGet(Name = "GetStatutMessage")]        
        public IEnumerable<GetStatutMessageDto> GetStatutMessage()
        {
            var statutsmessage = _patchNoteDbContext.StatutMessageRecommandations
                .Select(c => new GetStatutMessageDto
                {
                    id = c.Id,
                    nomStatut = c.NomStatut,
                    color = c.Color
                });

            return statutsmessage;
        }

        [HttpPost]
        public async Task<ActionResult<StatutMessageRecommandation>> AddStatutMessage(StatutMessageRecommandation statutMessage)
        {
            _patchNoteDbContext.StatutMessageRecommandations.Add(statutMessage);
            await _patchNoteDbContext.SaveChangesAsync();

            return CreatedAtAction("GetStatutMessage", new { id = statutMessage.Id }, statutMessage);
        }

        [HttpDelete("/statutMessageRecommandation/delete/{id}", Name = "DeleteStatutById")]
        public async Task<ActionResult<StatutMessageRecommandation>> DeleteStatutMessage(int id)

        {
             var statutMessage = await _patchNoteDbContext.StatutMessageRecommandations.FindAsync(id);

                if(statutMessage == null)
                {
                    return NotFound();
                }

                _patchNoteDbContext.StatutMessageRecommandations.Remove(statutMessage);
                await _patchNoteDbContext.SaveChangesAsync();

                return Ok(await _patchNoteDbContext.StatutMessageRecommandations.ToListAsync());
           
        }
    }