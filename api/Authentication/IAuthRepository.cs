using System.Threading.Tasks;
using LMS.Models;
using LMS.Models.Users;

namespace LMS.Authentication
{
    public interface IAuthRepository
    {
         Task<ServiceResponse<int>> Register(User user, string password);
         Task<ServiceResponse<string>> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}