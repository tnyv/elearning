using System.Collections.Generic;
using System.Threading.Tasks;
using api.DTOs.UserDTOs;
using LMS.DTOs.UserDTOs;
using LMS.Models;
using LMS.Models.Users;
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

        // [AllowAnonymous] // Will not require authentication
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

        // Methods "Register" and "Login" below require Microsoft.AspNetCore.Authorization
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
























