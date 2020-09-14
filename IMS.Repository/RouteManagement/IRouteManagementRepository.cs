using IMS.DomainModel.ApplicationClasses.RouteManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.RouteManagement
{
    public interface IRouteManagementRepository
    {
        /// <summary>
        /// Method to add route - SS
        /// </summary>
        /// <param name="addRoute">route detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<RouteManagementResponse> AddRouteAsync(AddRouteManagementAc addRoute, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of routes - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of routes</returns>
        Task<List<Route>> GetRoutesAsync(int instituteId);

        /// <summary>
        /// Method to update route - SS
        /// </summary>
        /// <param name="updateRoute">route detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<RouteManagementResponse> UpdateRouteAsync(UpdateRouteManagementAc updateRoute, ApplicationUser loggedInUser);
    }
}
