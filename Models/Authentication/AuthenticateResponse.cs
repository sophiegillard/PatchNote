
#nullable disable

using PatchNote.Api.Data.ApschoolDatas.Entities;

namespace PatchNote.Api.Models.Authentication
{

    public class ModuleInfo
    {
        public int Id { get; set; }
        
        public string Nom { get; set; }
    }
    public class AuthenticateResponse
    {
        public int UtilisateurId { get; set; }
        
        public string Identifiant { get; set; }
                
        public string Token { get; set; }
        
        public Utilisateur Utilisateur { get; set; }

        public ModuleInfo[] Modules { get; set; }

    }
}