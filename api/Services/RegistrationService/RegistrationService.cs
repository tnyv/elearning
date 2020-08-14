using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using LMS.Data;
using LMS.Models;
using Microsoft.EntityFrameworkCore;
using LMS.Models.Courses;
using LMS.DTOs.CourseDTOs;
using System.Linq;
using LMS.DTOs.RegistrationDTOs;

namespace LMS.Services.RegistrationService
{
    public class RegistrationService : IRegistrationService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public RegistrationService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetRegistrationDTO>>> GetAllRegistrations()
        {
            ServiceResponse<List<GetRegistrationDTO>> serviceResponse = new ServiceResponse<List<GetRegistrationDTO>>();
            List<Registration> dbRegistrations = await _context.Registrations.ToListAsync();
            serviceResponse.Data = (dbRegistrations.Select(c => _mapper.Map<GetRegistrationDTO>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetRegistrationDTO>>> AddRegistration(AddRegistrationDTO newRegistration)
        {
            ServiceResponse<List<GetRegistrationDTO>> serviceResponse = new ServiceResponse<List<GetRegistrationDTO>>();
            
            Registration registration = _mapper.Map<Registration>(newRegistration);

            await _context.Registrations.AddAsync(registration);
            await _context.SaveChangesAsync();
            
            serviceResponse.Data = (_context.Registrations.Select(c => _mapper.Map<GetRegistrationDTO>(c))).ToList();
            serviceResponse.Message = "User has succesfully registered to course.";
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetRegistrationDTO>>> DeleteRegistration(int id)
        {
            ServiceResponse<List<GetRegistrationDTO>> serviceResponse = new ServiceResponse<List<GetRegistrationDTO>>();
            try
            {
                Registration registrations = await _context.Registrations.FirstAsync(c => c.Id == id);
                _context.Registrations.Remove(registrations);
                await _context.SaveChangesAsync();
                serviceResponse.Data = (_context.Registrations.Select(c => _mapper.Map<GetRegistrationDTO>(c))).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }
    }
}