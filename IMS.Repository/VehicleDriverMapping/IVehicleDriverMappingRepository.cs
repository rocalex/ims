using IMS.DomainModel.ApplicationClasses.VehicleDriverMapping;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleDriverMapping
{
    public interface IVehicleDriverMappingRepository
    {
        /// <summary>
        /// Method to add and update vehicle driver mapping - SS
        /// </summary>
        /// <param name="vehicleDriverMapping">vehicle driver detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleDriverMappingResponse> AddOrUpdateVehicleDriverMappingAsync(AddOrUpdateVehicleDriverMappingAc
            vehicleDriverMapping, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get driver list by vehicle id - SS
        /// </summary>
        /// <param name="vehicleId">vehicle id</param>
        /// <returns>driver list</returns>
        Task<List<DomainModel.Models.VehicleDriverMapping>> GetVehicleDriverMappingsAsync(int vehicleId);
    }
}
