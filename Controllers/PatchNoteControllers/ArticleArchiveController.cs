using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;

namespace PatchNote.Api.Controllers.PatchNoteControllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticleArchiveController : ControllerBase
    {
        private readonly patchNoteDbContext _patchNoteDbContext;
        public ArticleArchiveController(patchNoteDbContext patchNoteDbContext)
        {
            _patchNoteDbContext = patchNoteDbContext;
        }

        [HttpPut("/article/archive/{id}")]
        public IActionResult ArchiveArticle(int id)
        {
            var article = _patchNoteDbContext.Articles.Find(id);
            if (article == null)
            {
                return NotFound();
            }

            article.IsArchive = article.IsArchive == 1 ? article.IsArchive = 0 : article.IsArchive = 1;

            _patchNoteDbContext.SaveChanges();

            return Ok();
        }

    }
}