using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.DTOs.User;
using LMS.Models;
using LMS.Services.UserService;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsers());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSingle(int id)
        {
            return Ok(await _userService.GetUserById(id));
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(AddUserDTO newUser) {
            return Ok(await _userService.AddUser(newUser));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUserDTO updatedUser) {
            ServiceResponse<GetUserDTO> response = await _userService.UpdateUser(updatedUser);
            if(response.Data == null) 
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ServiceResponse<List<GetUserDTO>> response = await _userService.DeleteUser(id);
            if(response.Data == null) 
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
























