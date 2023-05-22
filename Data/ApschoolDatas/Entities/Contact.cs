using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatchNote.Api.Data.ApschoolDatas.Entities
{
    public class Contact
    {
        public int id { get; set; }

        public int utilisateur_id { get; set; }

        public string? email { get; set; }
    }
}