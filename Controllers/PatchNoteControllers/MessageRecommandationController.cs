using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Models.DTOs.Requests;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
    public class MessageRecommandationController : Controller
    {
            private readonly patchNoteDbContext _patchNoteDbContext;
            public MessageRecommandationController(patchNoteDbContext patchNoteDbContext)
            {
                this._patchNoteDbContext = patchNoteDbContext;
            }

            [HttpGet]
            public IActionResult GetMessageRecommandation(
                                                        int? statutMessageRecommandationId,
                                                        int? isRead,
                                                        int? _page,
                                                        int? _limit,
                                                        string? search)
                {
                    IQueryable<MessageRecommandation> messageRecommandationQuery = _patchNoteDbContext.MessageRecommandations
                                                                        .OrderByDescending(m => m.DateCreation);

                    // Add search filter
                    if (!string.IsNullOrEmpty(search))
                    {
                        messageRecommandationQuery = messageRecommandationQuery
                            .Where(m => m.Sujet.Contains(search) || m.Message.Contains(search));
                            messageRecommandationQuery = messageRecommandationQuery
                                .Where(m => m.Sujet.ToLower().Contains(search.ToLower()) || m.Message.ToLower().Contains(search.ToLower()));
                    }

                    if (statutMessageRecommandationId.HasValue)
                    {
                        messageRecommandationQuery = messageRecommandationQuery.Where(m => m.StatutMessageRecommandationId == statutMessageRecommandationId.Value);
                    }

                    if(isRead.HasValue)
                    {
                        messageRecommandationQuery = messageRecommandationQuery.Where(m => m.IsLu == isRead.Value);
                    }
                    
                    // Apply pagination
                    int page = _page ?? 1;
                    int limit = _limit ?? 10;
                    int offset = (page - 1) * limit;
                    messageRecommandationQuery = messageRecommandationQuery.Skip(offset).Take(limit);

                    // Execute the query and get the messages
                    var messages = messageRecommandationQuery
                        .Include(m => m.StatutMessageRecommandation)
                        .ToList();

                    if (messages == null)
                    {
                        return NotFound();
                    }

                    // Convert the messages to DTOs
                    var messageRecommandationDisplayDtos = messages.Select(message => new MessageRecommandationDisplayDto
                    {
                        Id = message.Id,
                        Ecole = message.Ecole,
                        Auteur = message.Auteur,
                        Sujet = message.Sujet,
                        Message = message.Message,
                        DateCreation = message.DateCreation.ToString("dd-MM-yyyy"),
                        IsLu = message.IsLu,
                        StatutMessageRecommandationId = message.StatutMessageRecommandationId,
                        StatutMessageRecommandation = message.StatutMessageRecommandation.NomStatut,
                        StatutMessageRecommandationColor = message.StatutMessageRecommandation.Color
                    }).ToList();

                    // Get the total count of messages for pagination
                    int totalCount = _patchNoteDbContext.MessageRecommandations.Count();

                    // Get the total count of unread messages
                    int unreadCount = _patchNoteDbContext.MessageRecommandations.Count(m => m.IsLu == 0);

                    // Calculate pagination values
                    int totalPages = (int)Math.Ceiling((double)totalCount / limit);
                    int? nextPage = page < totalPages ? page + 1 : null;
                    int? previousPage = page > 1 ? page - 1 : null;

                    // Return the messages as JSON with pagination information in the response body
                    return Ok(new {
                        totalCount = totalCount,
                        unreadCount = unreadCount,
                        totalPages = totalPages,
                        currentPage = page,
                        nextPage = nextPage,
                        previousPage = previousPage,
                        data = messageRecommandationDisplayDtos
                    });
                }


            [HttpGet("{id}")]
            public async Task<ActionResult<MessageRecommandation>> GetMessageRecommandation(int id)
            {
                var messageRecommandation = await _patchNoteDbContext.MessageRecommandations.FindAsync(id);

                if (messageRecommandation == null)
                {
                    return NotFound();
                }

                return messageRecommandation;
            }


            [HttpPost]
            public async Task<ActionResult<MessageRecommandation>> AddMessageRecommandation(MessageRecommandation messageRecommandation)
            {
                messageRecommandation.DateCreation = DateTime.UtcNow;
                messageRecommandation.IsLu = 0;
                messageRecommandation.StatutMessageRecommandationId = 4;

                _patchNoteDbContext.MessageRecommandations.Add(messageRecommandation);
                await _patchNoteDbContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetMessageRecommandation), new { id = messageRecommandation.Id }, messageRecommandation);
            }


            [HttpPut("/messageRecommandation/updateStatut/{id}", Name = "UpdateStatutMessageRecommandationById")]
            public async Task<ActionResult<RecommandationMessageUpdateStatutDto>> UpdateMessageRecommandationStatut(int id, RecommandationMessageUpdateStatutDto recommandationMessageUpdateStatutDto)
            {
                var message = _patchNoteDbContext.MessageRecommandations.FirstOrDefault(a => a.Id == id);

                if (message == null)
                {
                    return NotFound();
                }

                message.StatutMessageRecommandationId = recommandationMessageUpdateStatutDto.StatutMessageRecommandationId;

                _patchNoteDbContext.MessageRecommandations.Update(message);
                await _patchNoteDbContext.SaveChangesAsync();

                return Ok();
            }


            [HttpPut("/messageRecommandation/setRead/{id}", Name = "SetReadMessageRecommandation")]
            public async Task<ActionResult<RecommandationMessageSetReadDto>> SetReadMessageRecommandation(int id, RecommandationMessageSetReadDto recommandationMessageSetReadDto)
            {
                var message = _patchNoteDbContext.MessageRecommandations.FirstOrDefault(a => a.Id == id);

                if (message == null)
                {
                    return NotFound();
                }

                message.IsLu = recommandationMessageSetReadDto.IsLu;

                _patchNoteDbContext.MessageRecommandations.Update(message);
                await _patchNoteDbContext.SaveChangesAsync();

                return Ok();
            }


            [HttpDelete("{id}")]
            public async Task<ActionResult<MessageRecommandation>> DeleteMessage(int id)

        {
             var message = await _patchNoteDbContext.MessageRecommandations.FindAsync(id);

                if(message == null)
                {
                    return NotFound();
                }

                _patchNoteDbContext.MessageRecommandations.Remove(message);
                await _patchNoteDbContext.SaveChangesAsync();

                return Ok(await _patchNoteDbContext.MessageRecommandations.ToListAsync());
           
        }
    }