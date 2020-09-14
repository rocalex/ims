using IMS.DomainModel.ApplicationClasses.VehicleRepairManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleRepairManagement
{
    public interface IVehicleRepairManagementRepository
    {
        /// <summary>
        /// Method to add vehicle repair - SS
        /// </summary>
        /// <param name="addVehicleRepair">vehicle repair</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleRepairManagementResponse> AddVehicleRepairAsync(AddVehicleRepairManagementAc addVehicleRepair,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of vehicle repairs - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicle repairs</returns>
        Task<List<VehicleRepair>> GetVehicleRepairsAsync(int instituteId);

        /// <summary>
        /// Method to update vehicle repair - SS
        /// </summary>
        /// <param name="updateVehicleRepair">vehicle repair</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleRepairManagementResponse> UpdateVehicleRepairAsync(UpdateVehicleRepairManagementAc updateVehicleRepair,
            ApplicationUser loggedInUser);
    }
}
