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
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom));

            CreateMap<Article, ArticleDetailsDisplayDto>()
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("yyyy-MM-dd")))
                .ForMember(dest => dest.DateModification, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom))
                .ForMember(dest => dest.IsNew, opt => opt.Ignore());

            CreateMap<Article, ArticleAdminDetailsDisplayDto>()
                .ForMember(dest => dest.CategorieId, opt => opt.MapFrom(src => src.Categorie.Id))
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom))
                .ForMember(dest => dest.ModuleId, opt => opt.MapFrom(src => src.Module.Id))
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.DateModification, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Auteur, opt => opt.Ignore());

            CreateMap<ArticleUpdateDto, Article>()
                .ForMember(dest => dest.DateModification, opt => opt.Ignore());


        }
    }

}