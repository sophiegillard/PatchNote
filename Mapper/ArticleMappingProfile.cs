using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Api.Data.PatchNoteDatas.Entities.Articles;


namespace PatchNote.Mapper
{
    public class ArticleMappingProfile : Profile
    {
        public ArticleMappingProfile()
        {
            CreateMap<Article, ArticleDisplayDto>()
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom))
                .AfterMap((src, dest) =>
                {
                    dest.DatePublication = DateTime.ParseExact(dest.DatePublication, "yyyy-MM-dd", null).ToString("yyyy-MM-dd");
                });

            CreateMap<Article, ArticleDetailsDisplayDto>()
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.DateModification, opt => opt.MapFrom(src => src.DateModification.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom))
                .ForMember(dest => dest.IsNew, opt => opt.Ignore())
                 .AfterMap((src, dest) =>
                {
                    dest.DatePublication = DateTime.ParseExact(dest.DatePublication, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                    dest.DateModification = DateTime.ParseExact(dest.DateModification, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                });


            CreateMap<Article, ArticleAdminDetailsDisplayDto>()
                .ForMember(dest => dest.CategorieId, opt => opt.MapFrom(src => src.Categorie.Id))
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom))
                .ForMember(dest => dest.ModuleId, opt => opt.MapFrom(src => src.Module.Id))
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.DateModification, opt => opt.MapFrom(src => src.DateModification.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Auteur, opt => opt.Ignore())
                  .AfterMap((src, dest) =>
                {
                    dest.DatePublication = DateTime.ParseExact(dest.DatePublication, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                    dest.DateModification = DateTime.ParseExact(dest.DateModification, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                });

            CreateMap<ArticleUpdateDto, Article>()
                .ForMember(dest => dest.DateModification, opt => opt.Ignore());


        }
    }

}