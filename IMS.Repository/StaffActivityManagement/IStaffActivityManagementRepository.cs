using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StaffActivityManagement
{
    public interface IStaffActivityManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all activities - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<StaffActivityAc>> GetAllActivitiesAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching an activity by id - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<StaffActivityAc> GetActivityByIdAsync(int activityId, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new activity - RS
        /// </summary>
        /// <param name="newStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddActivityAsync(StaffActivityAc newStaffActivityAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing activity - RS
        /// </summary>
        /// <param name="activityId"></param>
        /// <param name="updatedStaffActivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> UpdateActivityAsync(int activityId, StaffActivityAc updatedStaffActivityAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching the list of all students for attendee - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<StudentBasicInformation>> GetAttendeeStudentsListAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching the list of all system users for attendee - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<UserAc>> GetAttendeeSystemUsersListAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching the list of all activities for a particular student - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="studentId"></param>
        /// <returns></returns>
        Task<List<StaffActivity>> GetActivitiesForStudentAsync(int currentUserInstituteId, int? studentId);

        /// <summary>
        /// Method for fetching the list of all activities for a particular staff - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="staffId"></param>
        /// <returns></returns>
        Task<List<StaffActivity>> GetActivitiesForStaffAsync(int currentUserInstituteId, int? staffId);
    }
}
