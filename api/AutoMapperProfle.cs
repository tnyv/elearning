using AutoMapper;
using LMS.DTOs.CourseDTOs;
using LMS.DTOs.RegistrationDTOs;
using LMS.DTOs.UserDTOs;
using LMS.Models.Courses;
using LMS.Models.Users;

namespace LMS
{
    // This class provides the "mapping" between the DTO's and the models in the SQL Server db.
    // The DTO's essentially grab the body information with each HTTP call and translates it over
    // to a data object (which is the model) that the backend can read. 
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