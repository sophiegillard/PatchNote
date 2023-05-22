

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class UtilisateurDto
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public string? Prenom { get; set; }
        public int TypeUtilisateur { get; set; }
        public int newsletter { get; set; }
        public string? langue { get; set; }
        public string? email { get; set; }

        public EcoleAuxiliaireDto? EcoleAuxiliaire { get; set; }
    }
}