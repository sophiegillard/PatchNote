
using Microsoft.AspNetCore.Mvc.Filters;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using Microsoft.AspNetCore.Mvc;

#nullable disable

namespace PatchNote.Api.Application.Authorization
{
    [AttributeUsage(AttributeTargets.Method)]
    public class AllowAnonymousAttribute : Attribute
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            // authorization
            var user = (Identifiant)context.HttpContext.Items["Identifiants"];
            if (user == null)
                context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}