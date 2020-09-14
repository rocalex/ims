using IMS.DomainModel.ApplicationClasses.VehicleAccidentManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleAccidentManagement
{
    public interface IVehicleAccidentManagementRepository
    {
        /// <summary>
        /// Method to add vehicle accident - SS
        /// </summary>
        /// <param name="addVehicleAccident">vehicle accident</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleAccidentManagementResponse> AddVehicleAccidentAsync(AddVehicleAccidentManagementAc addVehicleAccident,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of vehicle accidents - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicle accidents</returns>
        Task<List<VehicleAccident>> GetVehicleAccidentsAsync(int instituteId);

        /// <summary>
        /// Method to update vehicle accident - SS
        /// </summary>
        /// <param name="addVehicleAccident">vehicle accident</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleAccidentManagementResponse> UpdateVehicleAccidentAsync(UpdateVehicleAccidentManagementAc updateVehicleAccident,
            ApplicationUser loggedInUser);
    }
}
