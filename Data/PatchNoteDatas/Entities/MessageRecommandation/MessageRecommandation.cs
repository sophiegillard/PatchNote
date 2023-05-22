using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;

    public partial class MessageRecommandation
    {
        public int Id { get; set; }
        public string Ecole { get; set; }

        // [Required(ErrorMessage = "L'auteur est obligatoire.")]
        // [RegularExpression(@"^[a-zA-Z0-9\s]+$", ErrorMessage = "Le champ Auteur ne doit pas contenir de caractères spéciaux.")]
        // [StringLength(50, ErrorMessage = "Le champ Auteur ne doit pas dépasser 50 caractères.")]
        public string Auteur { get; set; }

        // [Required(ErrorMessage = "Le sujet est obligatoire.")]
        // [RegularExpression(@"^[a-zA-Z0-9\s]+$", ErrorMessage = "Le champ Sujet ne doit pas contenir de caractères spéciaux.")]
        // [StringLength(100, ErrorMessage = "Le champ Sujet ne doit pas dépasser 50 caractères.")]
        public string Sujet { get; set; }

        // [Required(ErrorMessage = "Le message est obligatoire.")]
        public string Message { get; set; }
        public DateTime DateCreation { get; set; }
        public byte IsLu { get; set; }
        public int StatutMessageRecommandationId { get; set; }
        public virtual StatutMessageRecommandation StatutMessageRecommandation { get; set; }
    }

