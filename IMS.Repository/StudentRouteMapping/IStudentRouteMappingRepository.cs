using IMS.DomainModel.ApplicationClasses.StudentRouteMapping;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StudentRouteMapping
{
    public interface IStudentRouteMappingRepository
    {
        /// <summary>
        /// Method to add and update student route mapping - SS
        /// </summary>
        /// <param name="studentRouteMapping">student route detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<StudentRouteMappingResponse> AddOrUpdateStudentRouteMappingAsync(AddOrUpdateStudentRouteMappingAc
            studentRouteMapping, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get student list by route id - SS
        /// </summary>
        /// <param name="routeId">route id</param>
        /// <returns>student list</returns>
        Task<List<int>> GetStudentByRouteIdAsync(int routeId);
    }
}
