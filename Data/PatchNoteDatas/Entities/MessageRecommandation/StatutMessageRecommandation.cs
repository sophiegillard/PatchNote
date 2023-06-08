using System;
using System.Collections.Generic;

#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;

public class StatutMessageRecommandation
{
    public StatutMessageRecommandation()
    {
        MessageRecommandations = new HashSet<MessageRecommandation>();
    }

    public int Id { get; set; }
    public string NomStatut { get; set; }
    public string Color { get; set; }

    public virtual ICollection<MessageRecommandation> MessageRecommandations { get; set; }
}

