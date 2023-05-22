using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;

namespace PatchNote.Api.Controllers.PatchNoteControllers
{
    [ApiController]
    [Route("[controller]")]
    public class ArticleArchiveController : ControllerBase
    {
        private readonly patchNoteDbContext _patchNoteDbContext;
        private readonly ApschoolDbContext _apschoolDbContext;
        public ArticleArchiveController(patchNoteDbContext patchNoteDbContext, ApschoolDbContext apschoolDbContext)
        {
            _patchNoteDbContext = patchNoteDbContext;

            _apschoolDbContext = apschoolDbContext;
        }

        [HttpPut("/article/archive/{id}")]
        public IActionResult ArchiveArticle(int id)
        {
            var article = _patchNoteDbContext.Articles.FirstOrDefault(a => a.Id == id);
            if (article == null)
            {
                return NotFound();
            }

            if(article.IsArchive == 1)
            {
                article.IsArchive = 0;
            }
            else
            {
                article.IsArchive = 1;
            }

            _patchNoteDbContext.SaveChanges();

            return Ok();
        }

    }
}