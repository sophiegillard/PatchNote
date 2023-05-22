using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class MessageRecommandationDisplayDto
    {
        public int Id { get; set; }
        public string Ecole { get; set; } = string.Empty;
        public string Auteur { get; set; } = string.Empty;
        public string Sujet { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public byte IsLu { get; set; }
        public int StatutMessageRecommandationId { get; set; }
        public string StatutMessageRecommandation { get; set; } = string.Empty;
        public string? StatutMessageRecommandationColor { get; set; }


        private DateTime _dateCreation;
        public string DateCreation 
        { 
            get => _dateCreation.ToString("dd-MM-yyyy"); 
            set => _dateCreation = DateTime.Parse(value); 
        }
    }
}