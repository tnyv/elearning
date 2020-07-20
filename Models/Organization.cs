using System.Collections.Generic;
using LMS.Models.Users;

namespace LMS.Models
{
    public class Organization
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public List<User> Users { get; set;}
    }
}