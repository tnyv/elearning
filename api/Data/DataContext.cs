using LMS.Models;
using LMS.Models.Courses;
using LMS.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace LMS.Data
{
    // This class is used for object relational modelling. It is essentially the connection/bridge between the database and
    // this backend .NET server.
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<User> Users { get; set;}
        public DbSet<Course> Courses { get; set;}
        public DbSet<Registration> Registrations { get; set;}
    }
}