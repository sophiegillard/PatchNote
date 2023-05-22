
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace PatchNote.Api.Data.ApschoolDatas.Entities;

    [Table("ecoles")]
    public class Ecole
    {

    [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [Column("nom")]
        [MaxLength(255)]
        public string Nom { get; set; }


}

