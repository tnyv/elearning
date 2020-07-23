using System.Threading.Tasks;
using LMS.Data;
using LMS.DTOs.User;
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
                new User { Email = request.Email }, request.Password
            );
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginUserDTO request)
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