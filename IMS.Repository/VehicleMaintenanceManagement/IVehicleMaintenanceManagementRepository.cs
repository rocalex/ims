using IMS.DomainModel.ApplicationClasses.VehicleMaintenanceManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleMaintenanceManagement
{
    public interface IVehicleMaintenanceManagementRepository
    {
        /// <summary>
        /// Method to add Vehicle Maintenance - SS
        /// </summary>
        /// <param name="addVehicleMaintenance">Vehicle Maintenance</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleMaintenanceManagementResponse> AddVehicleMaintenanceAsync(AddVehicleMaintenanceManagementAc
            addVehicleMaintenance, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of Vehicle Maintenances - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of Vehicle Maintenances</returns>
        Task<List<VehicleMaintenance>> GetVehicleMaintenancesAsync(int instituteId);

        /// <summary>
        /// Method to update Vehicle Maintenance - SS
        /// </summary>
        /// <param name="updateVehicleMaintenance">Vehicle Maintenance</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleMaintenanceManagementResponse> UpdateVehicleMaintenanceAsync(UpdateVehicleMaintenanceManagementAc
            updateVehicleMaintenance, ApplicationUser loggedInUser);
    }
}
