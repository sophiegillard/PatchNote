using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Controllers.PatchNoteControllers;

    [ApiController]
    [Route("[controller]")]
    public class CategorieController : ControllerBase
    {
         private readonly patchNoteDbContext _patchNoteDbContext;
        public CategorieController(patchNoteDbContext patchNoteDbContext)
        {
            this._patchNoteDbContext = patchNoteDbContext;
        }


        [HttpGet(Name = "GetCategory")]
        public IEnumerable<GetCategorieDto> GetCategories()
        {
            var categories = _patchNoteDbContext.Categories
                .Select(c => new GetCategorieDto
                {
                    id = c.Id,
                    name = c.Nom
                });

            return categories;
        }
    }
