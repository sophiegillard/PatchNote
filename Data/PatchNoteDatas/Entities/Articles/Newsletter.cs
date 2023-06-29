using System;
using System.Collections.Generic;

#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

public partial class Newsletter
{
    public int Id { get; set; }
    public string TitreFR { get; set; }
    public string ResumeFR { get; set; }
    public string ContenuFR { get; set; }

    public string TitreEN { get; set; }
    public string ResumeEN { get; set; }
    public string ContenuEN { get; set; }

    public string TitreNL { get; set; }
    public string ResumeNL { get; set; }
    public string ContenuNL { get; set; }

    public byte IsPublished { get; set; }
    public byte IsBrouillon { get; set; }

    public DateTime DateCreation { get; set; }
    public DateTime DateModification { get; set; }
    public DateTime DatePublication { get; set; }


    public virtual ICollection<Article> Articles { get; set; }
}

