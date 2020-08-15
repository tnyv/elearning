using AutoMapper;
using LMS.DTOs.CourseDTOs;
using LMS.DTOs.RegistrationDTOs;
using LMS.DTOs.UserDTOs;
using LMS.Models.Courses;
using LMS.Models.Users;

namespace LMS
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, GetUserDTO>();

            CreateMap<Course, GetCourseDTO>();
            CreateMap<AddCourseDTO, Course>();

            CreateMap<Registration, GetRegistrationDTO>();
            CreateMap<AddRegistrationDTO, Registration>();
        }
    }
}