using System.Collections.Generic;
using LMS.Models;
using LMS.Models.Courses;
using LMS.Models.Users;

namespace LMS.DTOs.UserDTOs
{
    public class GetUserDTO
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Organization { get; set; }
        public string Role { get; set; }
        public List<Course> Courses { get; set; }
    }
}