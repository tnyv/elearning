using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using LMS.Data;
using LMS.DTOs.UserDTOs;
using LMS.Models;
using LMS.Models.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace LMS.Services.UserService
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public UserService(IMapper mapper, DataContext context, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
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

        public async Task<ServiceResponse<GetUserDTO>> GetUserByEmail(string email)
        {
            ServiceResponse<GetUserDTO> serviceResponse = new ServiceResponse<GetUserDTO>();
            User dbUser = await _context.Users.FirstOrDefaultAsync(f => f.Email == email);
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
                user.Email = updatedUser.Email;
                user.FirstName = updatedUser.FirstName;
                user.LastName = updatedUser.LastName;
                user.Organization = updatedUser.Organization;
                user.Points = updatedUser.Points;
                user.Certificates = updatedUser.Certificates;
                user.Registrations = updatedUser.Registrations;

                // Update the particular User in the database
                _context.Users.Update(user);
                // Save the changes in the database
                await _context.SaveChangesAsync();

                serviceResponse.Message = "User update successful.";
                serviceResponse.Data = _mapper.Map<GetUserDTO>(user);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        // ServiceResponse type is <string> because it will create JWT token
        public async Task<ServiceResponse<string>> Login(string email, string password)
        {
            ServiceResponse<string> response = new ServiceResponse<string>();
            User user = await _context.Users.FirstOrDefaultAsync(x => x.Email.ToLower().Equals(email.ToLower()));
            if (user == null)
            {
                response.Success = false;
                response.Message = "Invalid";
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                response.Success = false;
                response.Message = "Invalid";
            }
            else
            {
                response.Data = CreateToken(user);
            }

            return response;
        }

        public async Task<ServiceResponse<int>> Register(User user, string password)
        {
            ServiceResponse<int> response = new ServiceResponse<int>();

            if (await UserExists(user.Email))
            {
                response.Success = false;
                response.Message = "User already exists.";
                return response;
            }

            CreatePasswordHash(password, out byte[] passWordHash, out byte[] passwordSalt);
            user.PasswordHash = passWordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            response.Data = user.Id;
            return response;
        }

        public async Task<bool> UserExists(string email)
        {
            if (await _context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower()))
            {
                return true;
            }
            return false;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, user.Role)
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value)
            );

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}