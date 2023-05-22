using System.ComponentModel.DataAnnotations.Schema;

namespace PatchNote.Api.Data.ApschoolDatas.Entities;

[Table("utilisateurs", Schema = "apschool")]
public class Utilisateur
        {
        public int Id { get; set; }

        public string? Nom { get; set; }

        public string? Prenom { get; set; }

        public int Newsletter { get; set; }

        public string? Langue { get; set; }

        [Column(name: "type_utilisateur")]
        public int TypeUtilisateur { get; set; }

        [Column(name: "ecole_auxiliaire_id")]
        public int EcoleAuxiliaireId { get; set; }


        // Navigation properties
        public EcoleAuxiliaire EcoleAuxiliaire { get; set; }

}

