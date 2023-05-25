
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

[ApiController]
[Route("[controller]")]
public class ModuleController : ControllerBase
{
    private readonly patchNoteDbContext _patchNoteDbContext;
    public ModuleController(patchNoteDbContext patchNoteDbContext)
    {
        _patchNoteDbContext = patchNoteDbContext;
    }

    [HttpGet]
    public IEnumerable<Module> Get()
    {
        return _patchNoteDbContext.Modules;
    }

}
