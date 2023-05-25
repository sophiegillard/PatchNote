

using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

namespace PatchNote.Api.Application.Authorization
{
    public interface IJwtUtils
    {
        public string GenerateToken(Identifiant identifiant);
        public int? ValidateToken(string token);
    }
}