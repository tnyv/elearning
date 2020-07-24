using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.DTOs.UserDTOs;
using LMS.Models;

namespace LMS.Services.UserService
{
    public interface IUserService
    {
         Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers();

         Task<ServiceResponse<GetUserDTO>> GetUserById(int id);

         Task<ServiceResponse<GetUserDTO>> UpdateUser(UpdateUserDTO updatedUser);

         Task<ServiceResponse<List<GetUserDTO>>> DeleteUser(int id);
    }
}