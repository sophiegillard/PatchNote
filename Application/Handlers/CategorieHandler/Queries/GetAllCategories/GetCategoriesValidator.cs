using FluentValidation;

namespace PatchNote.Api.Application.Handlers.CategorieHandler.Queries.DiplayAllCatgories;

    public class GetCategoriesDisplayValidator : AbstractValidator<GetCategoriesQuery>
    {
        // public GetCategoriesDisplayValidator()
        // {
        //     RuleFor(x => x.Nom)
        //         .NotEmpty()
        //         .WithMessage("Nom is required.")
        //         .MaximumLength(50)
        //         .WithMessage("Nom must be less than or equal to 50 characters.");
        // }
        
    }
