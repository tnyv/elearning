using System.Collections.Generic;
using LMS.Models.Users;

namespace LMS.Models.Courses
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
        public List<Module> Modules { get; set; }
        public User Instructor { get; set; }
        public List<User> Students { get; set; }
    }
}