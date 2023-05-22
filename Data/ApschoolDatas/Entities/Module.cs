
#nullable disable

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

namespace PatchNote.Api.Data.ApschoolDatas.Entities
{
  [Table("modules", Schema = "apschool")]
    public class Module
    {
      
        public int id { get; set; }

        public string nom { get; set; }

        // Navigation property for the EcoleAuxiliaireModules
        public ICollection<EcoleAuxiliaireModule> EcoleAuxiliaireModules { get; set; }
    }
}