using LMS.Models;

namespace LMS.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Email { get; set; }
        public bool Verified { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public Organization organization { get; set; }
    }
}