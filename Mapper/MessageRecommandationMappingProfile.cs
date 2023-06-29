using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using PatchNote.Api.Models.DTOs.Responses;
using PatchNote.Api.Models.DTOs.Requests;
using PatchNote.Api.Data.PatchNoteDatas.Entities.MessageRecommandation;


namespace PatchNote.Mapper
{
    public class MessageRecommandationMappingProfile : Profile
    {
        public MessageRecommandationMappingProfile()
        {
            CreateMap<MessageRecommandation, MessageRecommandationDisplayDto>()
                .ForMember(dest => dest.StatutMessageRecommandation, opt => opt.MapFrom(src => src.StatutMessageRecommandation.NomStatut))
                .ForMember(dest => dest.DateCreation, opt => opt.MapFrom(src => src.DateCreation.ToString("dd-MM-yyyy")))
                .AfterMap((src, dest) =>
                {
                    dest.DateCreation = DateTime.ParseExact(dest.DateCreation, "dd-MM-yyyy", null).ToString("dd-MM-yyyy");
                });
        }
    }

}