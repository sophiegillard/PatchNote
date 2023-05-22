using Microsoft.AspNetCore.Mvc;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.ApschoolDatas.Entities;

namespace PatchNote.Api.Controllers.ApschoolControllers
{
[Route("[controller]")]

    public class IdentifiantsController : Controller
    {
    private readonly ApschoolDbContext _dbContext;
    public IdentifiantsController(ApschoolDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    [HttpGet]
    public IEnumerable<Identifiants> Get()
    {
        return _dbContext.AllIdentifiants.Take(20);
    }
    }
}