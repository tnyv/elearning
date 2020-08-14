using System.Collections.Generic;
using System.Threading.Tasks;
using api.DTOs.UserDTOs;
using api.Models;
using LMS.DTOs.UserDTOs;
using LMS.Models;
using LMS.Models.Courses;
using LMS.Models.Users;
using LMS.Models.Users.Role;
using LMS.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("GetAll")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userService.GetAllUsers());
        }

        [Authorize]
        [HttpGet("{email}")]
        public async Task<IActionResult> GetSingle(string email)
        {
            return Ok(await _userService.GetUserByEmail(email));
        }

        [Authorize(Roles = Role.Admin)]
        [HttpPut]
        public async Task<IActionResult> UpdateUser(UpdateUserDTO updatedUser)
        {
            ServiceResponse<GetUserDTO> response = await _userService.UpdateUser(updatedUser);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [Authorize(Roles = Role.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ServiceResponse<List<GetUserDTO>> response = await _userService.DeleteUser(id);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterUserDTO request)
        {
            ServiceResponse<int> response = await _userService.Register(
                new User
                {
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Organization = request.Organization,
                    Role = "User",
                    Points = 0,
                    Certificates = new List<Certificate>(),
                    RegisteredCourses = new List<Registration>()
                }, request.Password
            );
            if (!response.Success)
            {
                return BadRequest(response);
            }
            response.Message = "New user succesfully registered.";
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO request)
        {
            ServiceResponse<string> response = await _userService.Login(
                request.Email, request.Password
            );
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
























