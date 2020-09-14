using IMS.DomainModel.ApplicationClasses.StudentRouteMapping;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.StudentRouteMapping
{
    public class StudentRouteMappingRepository : IStudentRouteMappingRepository
    {
        #region Private Variable(s)
        private readonly IMSDbContext _iMSDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        #endregion

        #region Constructor
        public StudentRouteMappingRepository(IMSDbContext iMSDbContext, IInstituteUserMappingHelperService
            instituteUserMappingHelperService)
        {
            _iMSDbContext = iMSDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }
        #endregion

        #region Public Method(s)
        /// <summary>
        /// Method to add and update student route mapping - SS
        /// </summary>
        /// <param name="studentRouteMapping">student route detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        public async Task<StudentRouteMappingResponse> AddOrUpdateStudentRouteMappingAsync(AddOrUpdateStudentRouteMappingAc
            studentRouteMapping, ApplicationUser loggedInUser)
        {
            var instituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(loggedInUser.Id, true);
            if (!await _iMSDbContext.Routes.AnyAsync(x => x.InstituteId == instituteId && x.Id == studentRouteMapping.RouteId))
                return new StudentRouteMappingResponse() { HasError = true, Message = "Route not found", ErrorType = StudentRouteMappingResponseType.RouteId };
            else
            {
                var studentIds = studentRouteMapping.StudentIds.Distinct().ToList();
                var studentCount = await _iMSDbContext.StudentBasicInformation.CountAsync(x => x.InstituteId == instituteId &&
                studentIds.Contains(x.Id));
                if (studentIds.Count != studentCount)
                    return new StudentRouteMappingResponse() { HasError = true, Message = "Student not found", ErrorType = StudentRouteMappingResponseType.StudentId };
                else
                {
                    var previous = await _iMSDbContext.StudentRouteMappings.Where(x => x.RouteId == studentRouteMapping.RouteId).ToListAsync();
                    _iMSDbContext.StudentRouteMappings.RemoveRange(previous);
                    await _iMSDbContext.SaveChangesAsync();
                    List<DomainModel.Models.StudentRouteMapping> studentRouteMappings = new List<DomainModel.Models.StudentRouteMapping>();
                    foreach (var student in studentRouteMapping.StudentIds)
                    {
                        studentRouteMappings.Add(new DomainModel.Models.StudentRouteMapping()
                        {
                            CreatedOn = DateTime.UtcNow,
                            RouteId = studentRouteMapping.RouteId,
                            StudentId = student,
                            UpdatedById = loggedInUser.Id
                        });
                    }
                    _iMSDbContext.StudentRouteMappings.AddRange(studentRouteMappings);
                    await _iMSDbContext.SaveChangesAsync();
                    return new StudentRouteMappingResponse() { HasError = false, Message = "Student route detail updated successfully" };
                }
            }
        }

        /// <summary>
        /// Method to get student list by route id - SS
        /// </summary>
        /// <param name="routeId">route id</param>
        /// <returns>student list</returns>
        public async Task<List<int>> GetStudentByRouteIdAsync(int routeId)
        {
            var students = await _iMSDbContext.StudentRouteMappings.Where(x => x.RouteId == routeId).Select(x => x.StudentId).ToListAsync();
            return students;
        }
        #endregion
    }
}
