using System.Collections.Generic;
using LMS.Models.Courses;

namespace LMS.DTOs.CourseDTOs
{
    public class AddCourseDTO
    {
        public string Name { get; set; }
        public string Summary { get; set; }
        public List<Module> Modules { get; set; }
    }
}