using AutoMapper;
using LMS.DTOs.User;
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