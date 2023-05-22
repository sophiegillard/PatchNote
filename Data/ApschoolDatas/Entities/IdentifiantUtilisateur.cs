namespace PatchNote.Api.Data.ApschoolDatas.Entities;

#nullable disable
public class IdentifiantUtilisateur
{
    public int Id { get; set; }
    public int IdentifiantId { get; set; }
    public int IdentifiantCibleId { get; set; }
    public int? UtilisateurId { get; set; }
    public DateTime? DateFin { get; set; }
    public string Commentaire { get; set; }

    // Navigation properties
    public Identifiants Identifiant { get; set; }
    public Utilisateur Utilisateur { get; set; }
}
