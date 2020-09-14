using IMS.DomainModel.ApplicationClasses.LeaveManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.LeaveManagement
{
    public interface ILeaveManagementRepository
    {
        #region Student

        /// <summary>
        /// Method to apply student leave - SS
        /// </summary>
        /// <param name="addStudentLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<StudentLeaveResponse> AddStudentLeaveAsync(AddStudentLeaveAc addStudentLeave, int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method to get list of student leaves - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns></returns>
        Task<List<StudentLeave>> GetStudentLeavesAsync(ApplicationUser loggedInUser);

        /// <summary>
        /// Method to update applied student leave - SS
        /// </summary>
        /// <param name="updateStudentLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<StudentLeaveResponse> UpdateStudentLeaveAsync(UpdateStudentLeaveAc updateStudentLeave, int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for sending bell notification when a student's leave is approved - RS
        /// </summary>
        /// <param name="leaveApprovedByUser"></param>
        /// <param name="studentLeave"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task SendBellNotificationsForStudentLeaveApproveRejectAsync(ApplicationUser leaveApprovedByUser, StudentLeave studentLeave, int instituteId);

        #endregion

        #region Staff

        /// <summary>
        /// Method to apply Staff leave - SS
        /// </summary>
        /// <param name="addStaffLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<StaffLeaveResponse> AddStaffLeaveAsync(AddStaffLeaveAc addStaffLeave, int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method to get list of Staff leaves - SS
        /// </summary>
        /// <param name="loggedInUser">loggedInUser</param>
        /// <returns></returns>
        Task<List<StaffLeave>> GetStaffLeavesAsync(ApplicationUser loggedInUser);

        /// <summary>
        /// Method to update applied Staff leave - SS
        /// </summary>
        /// <param name="updateStaffLeave">leave detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<StaffLeaveResponse> UpdateStaffLeaveAsync(UpdateStaffLeaveAc updateStaffLeave, int instituteId, ApplicationUser currentUser);

        /// <summary>
        /// Method for sending bell notification when a staff's leave is approved - RS
        /// </summary>
        /// <param name="leaveApprovedByUser"></param>
        /// <param name="staffLeave"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task SendBellNotificationForStaffLeaveApproveRejectAsync(ApplicationUser leaveApprovedByUser, StaffLeave staffLeave, int instituteId);

        #endregion
    }
}
