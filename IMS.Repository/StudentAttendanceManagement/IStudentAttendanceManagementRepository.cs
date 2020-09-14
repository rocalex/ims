using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.ApplicationClasses.StudentAttendanceManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StudentAttendanceManagement
{
    public interface IStudentAttendanceManagementRepository
    {
        /// <summary>
        /// Method to add or update attendance - SS
        /// </summary>
        /// <param name="studentAttendances">student attendance detail</param>
        /// <param name="loggedInUser">logged in user</param>
        Task AddStudentAttendanceAsync(AddStudentAttendanceManagementWrapperAc studentAttendances, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get student details - SS
        /// </summary>
        /// <param name="getStudentAttendance">query data</param>
        /// <returns>list of student attendance</returns>
        Task<List<StudentAttendance>> GetStudentAttendanceAsync(GetStudentAttendanceManagementAc getStudentAttendance, ApplicationUser loggedInUser);

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
