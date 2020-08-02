using System.Threading.Tasks;
using api.DTOs.UserDTOs;
using LMS.Authentication;
using LMS.DTOs.UserDTOs;
using LMS.Models;
using LMS.Models.Users;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterUserDTO request)
        {
            ServiceResponse<int> response = await _authRepo.Register(
                new User
                {
                    Email = request.Email,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Organization = request.Organization,
                    Type = request.Type
                }, request.Password
            );
            if (!response.Success)
            {
                return BadRequest(response);
            }
            response.Message = "New user succesfully registered.";
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO request)
        {
            ServiceResponse<string> response = await _authRepo.Login(
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