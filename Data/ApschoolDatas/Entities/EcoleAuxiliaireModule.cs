using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace PatchNote.Api.Data.ApschoolDatas.Entities;

 [Table("ecole_auxiliaire_modules", Schema = "apschool")]
  
  [PrimaryKey(nameof(EcoleAuxiliaireId), nameof(ModuleId))]
    public class EcoleAuxiliaireModule
    {
        [Column("ecole_auxiliaire_id")]
        public int EcoleAuxiliaireId { get; set; }

        public EcoleAuxiliaire EcoleAuxiliaire { get; set; }

        [Column("module_id")]
        public int ModuleId { get; set; }

        public Module Module { get; set; }
    
    }
