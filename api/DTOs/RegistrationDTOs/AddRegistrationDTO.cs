using LMS.Models.Courses;
using LMS.Models.Users;

namespace LMS.DTOs.RegistrationDTOs
{
    public class AddRegistrationDTO
    {
        public Course Course { get; set; }
        public int CourseId {get; set;}
        public User User {get; set;}
        public int UserId {get; set;}
    }
}