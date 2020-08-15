using LMS.Models.Users;

namespace LMS.Models.Courses
{
    public class Registration
    {
        public int Id { get; set; }
        public Course Course { get; set; }
        public int CourseId {get; set;}
        public User User {get; set;}
        public int UserId {get; set;}
    }
}