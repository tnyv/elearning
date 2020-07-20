using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.DTOs.User;
using LMS.Models;

namespace LMS.Services.UserService
{
    public interface IUserService
    {
         Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers();

         Task<ServiceResponse<GetUserDTO>> GetUserById(int id);

         Task<ServiceResponse<List<GetUserDTO>>> AddUser(AddUserDTO newUser);

         Task<ServiceResponse<GetUserDTO>> UpdateUser(UpdateUserDTO updatedUser);

         Task<ServiceResponse<List<GetUserDTO>>> DeleteUser(int id);
    }
}