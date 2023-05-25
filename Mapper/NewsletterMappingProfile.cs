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
    public class NewsletterMappingProfile : Profile
    {
        public NewsletterMappingProfile()
        {
            CreateMap<Newsletter, NewsletterDisplayDto>()
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.DateCreation, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.DateModification, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Articles, opt => opt.Ignore());

            CreateMap<Article, NewsletterArticlesListDto>()
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom));

            CreateMap<NewsletterUpdateDto, Newsletter>()
                .ForMember(dest => dest.DateModification, opt => opt.Ignore());
        }
    }

}