using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using LMS.Data;
using LMS.DTOs.CourseDTOs;
using LMS.Models;
using LMS.Models.Courses;
using Microsoft.EntityFrameworkCore;

namespace LMS.Services.CourseService
{
    public class CourseService : ICourseService
    {
          private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CourseService(IMapper mapper, DataContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<List<GetCourseDTO>>> AddCourse(AddCourseDTO newCourse)
        {
            ServiceResponse<List<GetCourseDTO>> serviceResponse = new ServiceResponse<List<GetCourseDTO>>();
            Course course = _mapper.Map<Course>(newCourse);
  
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync(); 

            serviceResponse.Data = (_context.Courses.Select(f => _mapper.Map<GetCourseDTO>(f))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCourseDTO>>> DeleteCourse(int id)
        {
            ServiceResponse<List<GetCourseDTO>> serviceResponse = new ServiceResponse<List<GetCourseDTO>>();
            try
            {
                Course course = await _context.Courses.FirstAsync(f => f.Id == id);
                _context.Courses.Remove(course);
                await _context.SaveChangesAsync(); 
                serviceResponse.Data = (_context.Courses.Select(f => _mapper.Map<GetCourseDTO>(f))).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetCourseDTO>>> GetAllCourses()
        {
            ServiceResponse<List<GetCourseDTO>> serviceResponse = new ServiceResponse<List<GetCourseDTO>>();
            List<Course> dbCourses = await _context.Courses.ToListAsync();
            serviceResponse.Data = (dbCourses.Select(f => _mapper.Map<GetCourseDTO>(f))).ToList();
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseDTO>> GetCourseById(int id)
        {
            ServiceResponse<GetCourseDTO> serviceResponse = new ServiceResponse<GetCourseDTO>();
            Course dbCourse = await _context.Courses.FirstOrDefaultAsync(f => f.Id == id);
            serviceResponse.Data = _mapper.Map<GetCourseDTO>(dbCourse);
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetCourseDTO>> UpdateCourse(UpdateCourseDTO updatedCourse)
        {
            ServiceResponse<GetCourseDTO> serviceResponse = new ServiceResponse<GetCourseDTO>();
            try
            {
                // Grab the specific Course from the database asynchronously.
                Course course = await _context.Courses.FirstOrDefaultAsync(f => f.Id == updatedCourse.Id);
                course.Name = updatedCourse.Name;
                course.Modules = updatedCourse.Modules;
                
                // Update the particular Course in the database
                _context.Courses.Update(course);
                // Save the changes in the database
                await _context.SaveChangesAsync();

                serviceResponse.Data = _mapper.Map<GetCourseDTO>(course);
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