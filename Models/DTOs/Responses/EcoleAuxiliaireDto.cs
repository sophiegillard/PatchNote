using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatchNote.Api.Models.DTOs.Responses
{
    public class EcoleAuxiliaireDto
    {
        public int Id { get; set; }
        public EcoleDto Ecole { get; set; } = new EcoleDto();
        public string Nom { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Adresse { get; set; } = string.Empty;
        public List<ModuleDto> Modules { get; set; } = new List<ModuleDto>();
    }
}