
#nullable disable


using System.ComponentModel.DataAnnotations;

namespace PatchNote.Api.Models.Authentication
{
    public class AuthenticateRequest
    {

        [Required]
        public string UserName { get; set; }

        [Required]
        public string MotDePasse { get; set; }
    }
}