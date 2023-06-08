using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;

public partial class MessageRecommandation
{
    public int Id { get; set; }
    public string Auteur { get; set; }
    public string Sujet { get; set; }
    public string Message { get; set; }
    public DateTime DateCreation { get; set; }
    public byte IsLu { get; set; }
    public int StatutMessageRecommandationId { get; set; }
    public virtual StatutMessageRecommandation StatutMessageRecommandation { get; set; }
}

