
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.ApschoolDatas.Entities;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Controllers.ApschoolControllers;

[ApiController]
[Route("[controller]")]
public class ModuleController : ControllerBase
{
        private readonly ApschoolDbContext _dbContext;
    public ModuleController(ApschoolDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    [HttpGet]
    public IEnumerable<Module> Get()
    {
        return _dbContext.Modules;
    }

     [HttpGet("/usersModules", Name = "GetUsersModules")]
    public IActionResult GetUsersModules([FromQuery] int userId)
    {
        var utilisateurModules = _dbContext.Utilisateurs
                    .Include(u => u.EcoleAuxiliaire)
                        .ThenInclude(ea => ea.Ecole)
                    .Include(u => u.EcoleAuxiliaire.EcoleAuxiliaireModules)
                        .ThenInclude(eam => eam.Module)
                    .SingleOrDefault(u => u.Id == userId)
                    ?.EcoleAuxiliaire
                    ?.EcoleAuxiliaireModules
                    ?.Select(eam => eam.Module).ToList();
                
        var ModuleDtos = new List<ModuleDto>();

        foreach(var module in utilisateurModules)
        {
            var moduleDto = new ModuleDto
            {
                Id = module.id,
                Nom = module.nom
            };
            ModuleDtos.Add(moduleDto);
        }

        return Ok(ModuleDtos);
    }
}
