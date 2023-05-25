using BCryptNet = BCrypt.Net.BCrypt;
using AutoMapper;
using PatchNote.Api.Application.Authorization;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Helpers;
using PatchNote.Api.Models.Authentication;
using Microsoft.EntityFrameworkCore;

namespace PatchNote.Api.Application.Services
{
    public interface IUserService
    {
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        IEnumerable<Identifiant> GetAll();
        Identifiant GetById(int id);

    }

    public class UserService : IUserService
    {
        private patchNoteDbContext _patchNoteDbContext;
        private IJwtUtils _jwtUtils;
        private readonly IMapper _mapper;

        public UserService(patchNoteDbContext patchNoteDbContext, IJwtUtils jwtUtils, IMapper mapper)
        {
            _patchNoteDbContext = patchNoteDbContext;
            _jwtUtils = jwtUtils;
            _mapper = mapper;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            var identifiant = _patchNoteDbContext.Identifiants
                .Include(i => i.Utilisateur)
                .SingleOrDefault(x => x.UserName == model.UserName);

            // validate
            if (identifiant == null)
                throw new AppException("Username incorrect");
            if (!BCryptNet.Verify(model.MotDePasse, identifiant.MotDePasse))
                throw new AppException("Password is incorrect");


            // authentication successful
            var response = _mapper.Map<AuthenticateResponse>(identifiant);
            response.Token = _jwtUtils.GenerateToken(identifiant);
            response.Utilisateur = identifiant.Utilisateur;

            return response;
        }

        public IEnumerable<Identifiant> GetAll()
        {
            return _patchNoteDbContext.Identifiants;
        }

        public Identifiant GetById(int id)
        {
            return getUser(id);
        }


        // helper methods

        private Identifiant getUser(int id)
        {
            var user = _patchNoteDbContext.Identifiants.Find(id);
            if (user == null) throw new KeyNotFoundException("User not found");
            return user;
        }
    }
}