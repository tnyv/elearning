using System.Collections.Generic;

namespace LMS.DTOs.RegistrationDTOs
{
    public class GetRegistrationDTO
    {
        public int Id { get; set; }
        public int CourseId { get; set; }
        public int UserId {get; set;}
    }
}