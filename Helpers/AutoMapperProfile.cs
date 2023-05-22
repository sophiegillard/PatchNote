
using AutoMapper;
using PatchNote.Api.Data.ApschoolDatas.Entities;
using PatchNote.Api.Models.Authentication;

namespace PatchNote.Api.Helpers
{
   public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // User -> AuthenticateResponse

            CreateMap<Identifiants, AuthenticateResponse>()
                .ForMember(dest => dest.UtilisateurId, opt => opt.MapFrom(src => src.UtilisateurId))
                .ForMember(dest => dest.Identifiant, opt => opt.MapFrom(src => src.Identifiant));
            
            CreateMap<Utilisateur, AuthenticateResponse>()
                .ForMember(dest => dest.Utilisateur, opt => opt.MapFrom(src => src.TypeUtilisateur))
                .ForMember(dest => dest.Utilisateur, opt => opt.MapFrom(src => src.Nom))
                .ForMember(dest => dest.Utilisateur, opt => opt.MapFrom(src => src.Prenom));
        }
    }
}