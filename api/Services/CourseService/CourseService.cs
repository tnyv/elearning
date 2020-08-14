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
using LMS.Models.Courses;
using LMS.DTOs.CourseDTOs;

namespace LMS.Services.CourseService
{
    public class CourseService : ICourseService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public CourseService(IMapper mapper, DataContext context, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<ServiceResponse<List<GetCourseDTO>>> GetAllCourses()
        {
            ServiceResponse<List<GetCourseDTO>> serviceResponse = new ServiceResponse<List<GetCourseDTO>>();
            List<Course> dbCourses = await _context.Courses.ToListAsync();
            serviceResponse.Data = (dbCourses.Select(c => _mapper.Map<GetCourseDTO>(c))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseDTO>> GetCourseById(int id)
        {
            ServiceResponse<GetCourseDTO> serviceResponse = new ServiceResponse<GetCourseDTO>();
            Course dbCourse = await _context.Courses.FirstOrDefaultAsync(c => c.Id == id);
            serviceResponse.Data = _mapper.Map<GetCourseDTO>(dbCourse);
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCourseDTO>>> AddCourse(AddCourseDTO newCourse)
        {
            ServiceResponse<List<GetCourseDTO>> serviceResponse = new ServiceResponse<List<GetCourseDTO>>();
            
            Course course = _mapper.Map<Course>(newCourse);

            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();
            
            serviceResponse.Data = (_context.Courses.Select(c => _mapper.Map<GetCourseDTO>(c))).ToList();
            serviceResponse.Message = "New course successfully added";
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseDTO>> UpdateCourse(UpdateCourseDTO updatedCourse)
        {
            ServiceResponse<GetCourseDTO> serviceResponse = new ServiceResponse<GetCourseDTO>();
            try
            {
                // Grab the specific Course from the database asynchronously.
                Course course = await _context.Courses.FirstOrDefaultAsync(c => c.Id == updatedCourse.Id);
                course.Name = updatedCourse.Name;
                course.Modules = updatedCourse.Modules;

                // Update the specific Course in the database
                _context.Courses.Update(course);
                // Save the changes in the database
                await _context.SaveChangesAsync();

                serviceResponse.Message = "Course update successful.";
                serviceResponse.Data = _mapper.Map<GetCourseDTO>(course);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCourseDTO>>> DeleteCourse(int id)
        {
            ServiceResponse<List<GetCourseDTO>> serviceResponse = new ServiceResponse<List<GetCourseDTO>>();
            try
            {
                Course course = await _context.Courses.FirstAsync(c => c.Id == id);
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync();
                serviceResponse.Data = (_context.Courses.Select(c => _mapper.Map<GetCourseDTO>(c))).ToList();
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