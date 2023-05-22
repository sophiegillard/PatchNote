using BCryptNet = BCrypt.Net.BCrypt;
using AutoMapper;
using PatchNote.Api.Application.Authorization;
using PatchNote.Api.Data.ApschoolDatas.DBContext;
using PatchNote.Api.Data.ApschoolDatas.Entities;
using PatchNote.Api.Helpers;
using PatchNote.Api.Models.Authentication;
using Microsoft.EntityFrameworkCore;

namespace PatchNote.Api.Application.Services
{
     public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Identifiants> GetAll();
        Identifiants GetById(int id);
        
    }
    
    public class UserService : IUserService
    {
        private ApschoolDbContext _dbContext;
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public UserService(ApschoolDbContext dbContext, IJwtUtils jwtUtils,IMapper mapper)
        {
            _dbContext = dbContext;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var identifiant = _dbContext.AllIdentifiants
                .Include(i => i.Utilisateur)
                    .ThenInclude(u => u.EcoleAuxiliaire)
                        .ThenInclude(ea => ea.Ecole)
                    .Include(u => u.Utilisateur.EcoleAuxiliaire.EcoleAuxiliaireModules)
                    .ThenInclude(eam => eam.Module) 
                .SingleOrDefault(x => x.Identifiant == model.Identifiant);

            // validate
            if (identifiant == null )
                throw new AppException("Username incorrect");
            if(!BCryptNet.Verify(model.MotDePasse, identifiant.MotDePasse))
                throw new AppException("Password is incorrect");
            

            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(identifiant);
            response.Token = _jwtUtils.GenerateToken(identifiant);
            response.Utilisateur = identifiant.Utilisateur;
            response.Modules = identifiant.Utilisateur.EcoleAuxiliaire.EcoleAuxiliaireModules
                .Select(eam => new ModuleInfo { Id = eam.Module.id, Nom = eam.Module.nom })
                .ToArray();
    
            return response;
        }

        public IEnumerable<Identifiants> GetAll()
        {
            return _dbContext.AllIdentifiants;
        }

        public Identifiants GetById(int id)
        {
            return getUser(id);
        }


        // helper methods

        private Identifiants getUser(int id)
        {
            var user = _dbContext.AllIdentifiants.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}