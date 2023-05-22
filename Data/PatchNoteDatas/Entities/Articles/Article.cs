using System.ComponentModel.DataAnnotations.Schema;
using PatchNote.Api.Data.ApschoolDatas.Entities;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Common;


namespace PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

    public partial class Article
    {
        public int Id { get; set; }
        public string? TitreFR { get; set; }
        public string? ContenuFR { get; set; }
        public string? TitreEN { get; set; }
        public string? ContenuEN { get; set; }
        public string? TitreNL { get; set; }
        public string? ContenuNL { get; set; }
        public string? Version { get; set; }
        public DateTime DateCreation { get; set; }
        public DateTime DateModification { get; set; }
        public DateTime DatePublication { get; set; }
        public byte IsBrouillon { get; set; }
        public byte IsArchive { get; set; }
        public int CategorieId { get; set; }
        public int AuteurId { get; set; }
        public int? NewsletterId { get; set; }
        // public int UtilisateurId { get; set; }
        public int ModuleId { get; set; }




        [ForeignKey(nameof(CategorieId))]
        public Categorie? Categorie { get; set; }

        [ForeignKey(nameof(ModuleId))]
        public Module? Module { get; set; }

        // [ForeignKey(nameof(UtilisateurId))]
        // public UtilisateurApschool UtilisateurApschool { get; set; }

        [ForeignKey(nameof(NewsletterId))]
        public Newsletter? Newsletter { get; set; }
    }

