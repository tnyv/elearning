using AutoMapper;
using LMS.DTOs.UserDTOs;
using LMS.Models.Users;

namespace LMS
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDTO>();
        }
    }
}