using IMS.DomainModel.ApplicationClasses.LeaveStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.LeaveStatusManagement
{
    public interface ILeaveStatusManagementRepository
    {
        /// <summary>
        /// Method to seed Leave status - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        Task SeedLeaveStatusAsync(int instituteId);

        /// <summary>
        /// Method to add Leave Status - SS
        /// </summary>
        /// <param name="name">name of LeaveStatus</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddLeaveStatusAsync(AddLeaveStatusManagementAc addLeaveStatus,
            int instituteId);

        /// <summary>
        /// Method to get list of Leave Status by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<LeaveStatus>> GetAllLeaveStatusAsync(int instiuteId);

        /// <summary>
        /// Method to update Leave Status - SS
        /// </summary>
        /// <param name="updateLeaveStatusManagement">LeaveStatus detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateLeaveStatusAsync(UpdateLeaveStatusManagementAc
            updateLeaveStatusManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
