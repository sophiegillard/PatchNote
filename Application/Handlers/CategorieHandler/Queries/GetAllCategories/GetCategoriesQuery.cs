
using MediatR;
using PatchNote.Api.Models.DTOs.Responses;

#nullable disable

namespace PatchNote.Api.Application.Handlers.CategorieHandler.Queries.DiplayAllCatgories;

    public class GetCategoriesQuery : IRequest<List<GetCategorieDto>>
    {
    }
