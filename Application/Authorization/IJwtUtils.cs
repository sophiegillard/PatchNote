

using PatchNote.Api.Data.ApschoolDatas.Entities;

namespace PatchNote.Api.Application.Authorization
{
     public interface IJwtUtils
    {
        public string GenerateToken(Identifiants identifiant);
        public int? ValidateToken(string token);
    }
}