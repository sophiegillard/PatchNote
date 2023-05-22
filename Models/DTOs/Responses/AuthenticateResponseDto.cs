
namespace PatchNote.Api.Models.DTOs.Responses
{
    public class AuthenticateResponseDto
    {
    public int UtilisateurId { get; set; }
    public string Identifiant { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public UtilisateurDto Utilisateur { get; set; } = new UtilisateurDto();
    }
}