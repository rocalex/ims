using IMS.DomainModel.ApplicationClasses.LeaveTypeManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.LeaveTypeManagement
{
    public interface ILeaveTypeManagementRepository
    {
        /// <summary>
        /// Method to add Leave type - SS
        /// </summary>
        /// <param name="addLeaveType">leave type</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<LeaveTypeManagementResponse> AddLeaveType(AddLeaveTypeManagementAc addLeaveType, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get list of leave types - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of leave types</returns>
        Task<List<LeaveType>> GetLeaveTypesAsync(int instituteId);

        /// <summary>
        /// Method to update Leave type - SS
        /// </summary>
        /// <param name="updateLeaveType">leave type</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<LeaveTypeManagementResponse> UpdateLeaveType(UpdateLeaveTypeManagementAc updateLeaveType, ApplicationUser loggedInUser);
    }
}
