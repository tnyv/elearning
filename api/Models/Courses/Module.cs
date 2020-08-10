namespace LMS.Models.Courses
{
    public class Module
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public Course course { get; set; }
    }
}