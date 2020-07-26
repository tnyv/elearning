using System.Collections.Generic;
using LMS.Models.Users;

namespace LMS.Models.Courses
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Module> Modules { get; set; }
        public User User { get; set; }
        public bool Completed { get; set; }
    }
}