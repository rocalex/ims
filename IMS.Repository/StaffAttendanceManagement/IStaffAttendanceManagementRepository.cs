using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.ApplicationClasses.StaffAttendanceManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StaffAttendanceManagement
{
    public interface IStaffAttendanceManagementRepository
    {
        /// <summary>
        /// Method to add or update attendance - SS
        /// </summary>
        /// <param name="StaffAttendances">Staff attendance detail</param>
        /// <param name="loggedInUser">logged in user</param>
        Task AddStaffAttendanceAsync(List<AddStaffAttendanceManagementWrapperAc> staffAttendances, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get Staff details - SS
        /// </summary>
        /// <param name="getStaffAttendance">query data</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>list of Staff attendance</returns>
        Task<List<StaffAttendance>> GetStaffAttendanceAsync(GetStaffAttendanceManagementAc getStaffAttendance, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get current academic year week off - SS
        /// </summary>
        /// <param name="applicationUser">logged in user</param>
        /// <returns>list of week off</returns>
        Task<List<InstituteWeekOffAc>> GetWeekOffsByCurrentAcademicYearIdAsync(ApplicationUser applicationUser);

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
