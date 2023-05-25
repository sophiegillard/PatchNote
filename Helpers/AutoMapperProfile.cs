
using AutoMapper;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;
using PatchNote.Api.Models.Authentication;

namespace PatchNote.Api.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User -> AuthenticateResponse

            CreateMap<Identifiant, AuthenticateResponse>()
                .ForMember(dest => dest.UtilisateurId, opt => opt.MapFrom(src => src.UtilisateurId))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName));

            CreateMap<Utilisateur, AuthenticateResponse>()
                .ForMember(dest => dest.Utilisateur, opt => opt.MapFrom(src => src.Nom))
                .ForMember(dest => dest.Utilisateur, opt => opt.MapFrom(src => src.Prenom));
        }
    }
}