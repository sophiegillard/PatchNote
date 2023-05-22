

using MediatR;
using Microsoft.EntityFrameworkCore;
using PatchNote.Api.Application.Handlers.CategorieHandler.Queries.GetAllCategories;
using PatchNote.Api.Data.PatchNoteDatas.DBContext;
using PatchNote.Api.Models.DTOs.Responses;

namespace PatchNote.Api.Application.Handlers.CategorieHandler.Queries.DiplayAllCatgories;

public class GetCategoriesHandler : IRequestHandler<GetCategoriesQuery, List<GetCategorieDto>>
{
   private readonly patchNoteDbContext _dbContext;

    public GetCategoriesHandler(patchNoteDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<GetCategorieDto>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
    {
        var categories = await _dbContext.Categories.ToListAsync();
            var categorieList = new List<GetCategorieDto>();
            foreach (var categorieItem in categories)
            {
                var categorie = categorieItem.MapTo();
                categorieList.Add(categorie);
            }

            return categorieList;
    }
}