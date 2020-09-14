using IMS.DomainModel.ApplicationClasses.VehicleMasterManagement;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.VehicleMasterManagement
{
    public interface IVehicleMasterManagementRepository
    {
        /// <summary>
        /// Method to add vehicle master - SS
        /// </summary>
        /// <param name="addVehicleMaster">vehicle detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleMasterManagementResponse> AddVehicleMasterAsync(AddVehicleMasterManagementAc addVehicleMaster,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get vehicles list
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of vehicles</returns>
        Task<List<VehicleMaster>> GetVehicleMastersAsync(int instituteId);

        /// <summary>
        /// Method to update vehicle master - SS
        /// </summary>
        /// <param name="updateVehicleMaster">vehicle detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<VehicleMasterManagementResponse> UpdateVehicleMasterAsync(UpdateVehicleMasterManagementAc updateVehicleMaster,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to add images - SS
        /// </summary>
        /// <param name="formFiles">form files</param>
        /// <param name="vehicleId">vehicle id</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<VehicleMasterManagementResponse> AddOrUpdateImagesAsync(IFormFileCollection formFiles, int vehicleId, int instituteId);

        /// <summary>
        /// Method to add or update Vehicle document - SS
        /// </summary>
        /// <param name="files">image files</param>
        /// <param name="vehicleId">Vehicle id</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <param name="addVehicleDocuments">documnets details</param>
        Task AddOrUpdateVehicleDocumentsAsync(IFormFileCollection files, int vehicleId, ApplicationUser loggedInUser,
            List<AddVehicleDocumentMappingAc> addVehicleDocuments);
    }
}
