
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;

namespace PatchNote.Api.Application.Handlers.CategorieHandler.Queries.GetAllCategories
{
    public static class GetCategoriesQueryExtensions
    {
        public static GetCategorieDto MapTo(this Categorie categorie)
        {
            return new GetCategorieDto
            {
                id = categorie.Id,
                name = categorie.Nom
            };
        }
    }
}