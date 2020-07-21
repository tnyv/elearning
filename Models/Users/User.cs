using System.Collections.Generic;
using LMS.Models.Courses;

namespace LMS.Models.Users
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public bool Verified { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public AccountType Type { get; set; }
        public Organization Organization { get; set; }
        List<Course> Courses { get; set; }
    }
}