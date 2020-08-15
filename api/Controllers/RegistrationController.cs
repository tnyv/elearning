using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.DTOs.RegistrationDTOs;
using LMS.Models;
using LMS.Services.RegistrationService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LMS.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegistrationController : ControllerBase
    {
        private readonly IRegistrationService _registrationService;

        public RegistrationController(IRegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

       [HttpGet("GetAll")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _registrationService.GetAllRegistered());
        }

        [HttpPost]
        public async Task<IActionResult> AddRegistration(AddRegistrationDTO newRegistration)
        {
            return Ok(await _registrationService.AddRegistration(newRegistration));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            ServiceResponse<List<GetRegistrationDTO>> response = await _registrationService.DeleteRegistration(id);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}