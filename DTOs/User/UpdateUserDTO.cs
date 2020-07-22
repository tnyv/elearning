using System.Collections.Generic;
using LMS.Models;
using LMS.Models.Courses;
using LMS.Models.Users;

namespace LMS.DTOs.User
{
    public class UpdateUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Organization { get; set; }
        public AccountType Type { get; set; }
        public List<Course> Courses { get; set; }
    }
}