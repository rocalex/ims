using IMS.DomainModel.ApplicationClasses.DriverMasterManagement;
using IMS.DomainModel.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.DriverMasterManagement
{
    public interface IDriverMasterManagementRepository
    {
        /// <summary>
        /// Method to add driver - SS
        /// </summary>
        /// <param name="addDriverMaster">driver detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<DriverMasterManagementResponse> AddDriverMasterAsync(AddDriverMasterManagementAc addDriverMaster,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of drivers - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of drivers</returns>
        Task<List<DriverMaster>> GetDriverMastersAsync(int instituteId);

        /// <summary>
        /// Method to update driver - SS
        /// </summary>
        /// <param name="updateDriverMaster">driver detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<DriverMasterManagementResponse> UpdateDriverMasterAsync(UpdateDriverMasterManagementAc updateDriverMaster,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to add or update image - SS
        /// </summary>
        /// <param name="files">files</param>
        /// <param name="driverId">driver id</param>
        /// <param name="instituteId">institute id</param>
        Task AddOrUpdateImageAsync(IFormFileCollection files, int driverId, int instituteId);

        /// <summary>
        /// Method to migrated previous driver data - SS
        /// </summary>
        Task MigratedPreviousDataAsync();

        Task<dynamic> GetDriverDashboardDetails(string currentUserId, int currentUserInstituteId);
    }
}
