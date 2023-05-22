using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PatchNote.Api.Models.DTOs.Requests
{
    public class EmailDto
    {
        public string To { get; set; } = string.Empty;
        /*public List<string> ToEmails { get; set; } = new List<string>();*/
        public string Subject { get; set; } = string.Empty;

        public string Body { get; set; } = string.Empty;

        public List<KeyValuePair<string, string>> PlaceHolders { get; set; } = new List<KeyValuePair<string, string>>();
    }
}