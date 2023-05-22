using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PatchNote.Api.Data.ApschoolDatas.Entities;
    [Table("ecole_auxiliaires", Schema = "apschool")]
    public class EcoleAuxiliaire
    {
        [Column("id")]
        public int Id { get; set; }

        [Required]
        [Column("ecole_id")]
        public int EcoleId { get; set; }

        [Required]
        [Column("nom")]
        public string? Nom { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("adresse")]
        public string? Adresse { get; set; }


        // Navigation properties
        public Ecole? Ecole { get; set; }
        public ICollection<EcoleAuxiliaireModule> EcoleAuxiliaireModules { get; set; } = new HashSet<EcoleAuxiliaireModule>();
}

