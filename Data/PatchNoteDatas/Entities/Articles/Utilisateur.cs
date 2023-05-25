#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

public class Utilisateur
{
    public int Id { get; set; }
    public string Nom { get; set; }
    public string Prenom { get; set; }
    public int Newsletter { get; set; }
    public string Langue { get; set; }
    public string Email { get; set; }
}

