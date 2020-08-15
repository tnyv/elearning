using System.Collections.Generic;
using System.Threading.Tasks;
using LMS.DTOs.RegistrationDTOs;
using LMS.Models;

namespace LMS.Services.RegistrationService
{
    public interface IRegistrationService
    {
        Task<ServiceResponse<List<GetRegistrationDTO>>> GetAllRegistered();
        Task<ServiceResponse<List<GetRegistrationDTO>>> AddRegistration(AddRegistrationDTO newRegistration);
        Task<ServiceResponse<List<GetRegistrationDTO>>> DeleteRegistration(int id);
    }
}