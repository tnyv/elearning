using LMS.Models;
using LMS.Models.Courses;
using LMS.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace LMS.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set;}
        public DbSet<Course> Courses { get; set;}
    }
}