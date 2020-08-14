using System.Collections.Generic;
using LMS.Models.Courses;

namespace LMS.DTOs.RegistrationDTOs
{
    public class AddRegistrationDTO
    {
        public int CourseId { get; set; }
        public int UserId {get; set;}
    }
}