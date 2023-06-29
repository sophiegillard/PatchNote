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
                .ForMember(dest => dest.Articles, opt => opt.Ignore())
                 .AfterMap((src, dest) =>
                {
                    dest.DatePublication = DateTime.ParseExact(dest.DatePublication, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                    dest.DateCreation = DateTime.ParseExact(dest.DateCreation, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                    dest.DateModification = DateTime.ParseExact(dest.DateModification, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");

                });

            CreateMap<Article, NewsletterArticlesListDto>()
                .ForMember(dest => dest.DatePublication, opt => opt.MapFrom(src => src.DatePublication.ToString("dd-MM-yyyy")))
                .ForMember(dest => dest.Categorie, opt => opt.MapFrom(src => src.Categorie.Nom))
                .ForMember(dest => dest.Module, opt => opt.MapFrom(src => src.Module.Nom))
                   .AfterMap((src, dest) =>
                {
                    dest.DatePublication = DateTime.ParseExact(dest.DatePublication, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                });

            CreateMap<NewsletterUpdateDto, Newsletter>()
                .ForMember(dest => dest.DateModification, opt => opt.Ignore());
        }
    }

}