using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.ApschoolDatas.Entities;

namespace PatchNote.Api.Controllers.ApschoolControllers
{
    [Route("[controller]")]
    public class EcoleAuxiliaireController : Controller
    {
    private readonly ApschoolDbContext _dbContext;
        public EcoleAuxiliaireController(ApschoolDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        [HttpGet]
        public IEnumerable<EcoleAuxiliaire> Get()
        {
            return _dbContext.EcoleAuxiliaires.Take(20);
        }
    }
}