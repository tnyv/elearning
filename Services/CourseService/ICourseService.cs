using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.DTOs.CourseDTOs;
using LMS.Models;

namespace LMS.Services.CourseService
{
    public interface ICourseService
    {
        Task<ServiceResponse<List<GetCourseDTO>>> GetAllCourses(int userId);

        Task<ServiceResponse<GetCourseDTO>> GetCourseById(int id);

        Task<ServiceResponse<List<GetCourseDTO>>> AddCourse(AddCourseDTO newCourse);

        Task<ServiceResponse<GetCourseDTO>> UpdateCourse(UpdateCourseDTO updatedCourse);

        Task<ServiceResponse<List<GetCourseDTO>>> DeleteCourse(int id);
    }
}