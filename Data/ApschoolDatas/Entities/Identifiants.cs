using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

#nullable disable
namespace PatchNote.Api.Data.ApschoolDatas.Entities;

[Table("Identifiants", Schema = "apschool")]
public class Identifiants
    {
        public int Id { get; set; }

        public string Identifiant { get; set; }
        
        [Column(name: "mot_de_passe")]
        public string MotDePasse { get; set; }

        [Column(name: "utilisateur_id")]
        public int UtilisateurId { get; set; }

        // Navigation properties
        public Utilisateur Utilisateur { get; set; }
    }


