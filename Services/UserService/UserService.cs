using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LMS.Data;
using LMS.DTOs.User;
using LMS.Models;
using LMS.Models.Users;
using Microsoft.EntityFrameworkCore;

namespace LMS.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public UserService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetUserDTO>>> AddUser(AddUserDTO newUser)
        {
            ServiceResponse<List<GetUserDTO>> serviceResponse = new ServiceResponse<List<GetUserDTO>>();
            User user = _mapper.Map<User>(newUser);
  
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync(); 

            serviceResponse.Data = (_context.Users.Select(f => _mapper.Map<GetUserDTO>(f))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDTO>>> DeleteUser(int id)
        {
            ServiceResponse<List<GetUserDTO>> serviceResponse = new ServiceResponse<List<GetUserDTO>>();
            try
            {
                User user = await _context.Users.FirstAsync(f => f.Id == id);
                _context.Users.Remove(user);
                await _context.SaveChangesAsync(); 
                serviceResponse.Data = (_context.Users.Select(f => _mapper.Map<GetUserDTO>(f))).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetUserDTO>>> GetAllUsers()
        {
            ServiceResponse<List<GetUserDTO>> serviceResponse = new ServiceResponse<List<GetUserDTO>>();
            List<User> dbUsers = await _context.Users.ToListAsync();
            serviceResponse.Data = (dbUsers.Select(f => _mapper.Map<GetUserDTO>(f))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDTO>> GetUserById(int id)
        {
            ServiceResponse<GetUserDTO> serviceResponse = new ServiceResponse<GetUserDTO>();
            User dbUser = await _context.Users.FirstOrDefaultAsync(f => f.Id == id);
            serviceResponse.Data = _mapper.Map<GetUserDTO>(dbUser);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetUserDTO>> UpdateUser(UpdateUserDTO updatedUser)
        {
            ServiceResponse<GetUserDTO> serviceResponse = new ServiceResponse<GetUserDTO>();
            try
            {
                // Grab the specific User from the database asynchronously.
                User user = await _context.Users.FirstOrDefaultAsync(f => f.Id == updatedUser.Id);
                user.Username = updatedUser.Username;
                user.PasswordHash = updatedUser.PasswordHash;
                user.PasswordSalt = updatedUser.PasswordSalt;
                user.Email = updatedUser.Email;
                user.Verified = updatedUser.Verified;
                user.FirstName = updatedUser.FirstName;
                user.LastName = updatedUser.LastName;
                user.Phone = updatedUser.Phone;

                // Update the particular User in the database
                _context.Users.Update(user);
                // Save the changes in the database
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetUserDTO>(user);
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