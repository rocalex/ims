using IMS.DomainModel.ApplicationClasses.VehicleBreakDownManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleBreakDownManagement
{
    public interface IVehicleBreakDownManagementRepository
    {
        /// <summary>
        /// Method to add vehicle break down - SS
        /// </summary>
        /// <param name="addVehicleBreakDown">vehicle break down</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleBreakDownManagementResponse> AddVehicleBreakDownAsync(AddVehicleBreakDownManagementAc addVehicleBreakDown,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of vehicle break down - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicle break down</returns>
        Task<List<VehicleBreakDown>> GetVehicleBreakDownsAsync(int instituteId);

        /// <summary>
        /// Method to update vehicle break down - SS
        /// </summary>
        /// <param name="addVehicleBreakDown">vehicle break down</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleBreakDownManagementResponse> UpdateVehicleBreakDownAsync(UpdateVehicleBreakDownManagementAc updateVehicleBreakDown,
            ApplicationUser loggedInUser);
    }
}
