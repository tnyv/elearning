using System.Collections.Generic;
using LMS.Models.Courses;

namespace LMS.DTOs.CourseDTOs
{
    public class GetCourseDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Module> Modules { get; set; }
    }
}