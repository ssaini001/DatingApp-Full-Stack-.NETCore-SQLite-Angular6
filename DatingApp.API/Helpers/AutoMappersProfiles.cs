using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMappersProfiles : Profile              // extens Profile from AutoMapper Package
    {
        //Use constructors to create the profiles
        public AutoMappersProfiles()
        {
            CreateMap<User, UserForListDto>()
            .ForMember(dest => dest.PhotoUrl,opt=>opt.MapFrom(src => src.Photos.FirstOrDefault(p=>p.IsMain).url))
            .ForMember(dest=> dest.Age,opt=>opt.ResolveUsing(d=>d.DateOfBirth.CalculateAge()));
            CreateMap<User, UserForDetailDto>()
            .ForMember(dest => dest.PhotoUrl,opt=>opt.MapFrom(src => src.Photos.FirstOrDefault(p=>p.IsMain).url))
            .ForMember(dest=> dest.Age,opt=>opt.ResolveUsing(d=>d.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotosForDetailDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();

        }
    }
}