#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

public class Identifiant
{

    public int Id { get; set; }
    public int UtilisateurId { get; set; }
    public string UserName { get; set; }
    public string MotDePasse { get; set; }

    // Navigation properties
    public Utilisateur Utilisateur { get; set; }
}

