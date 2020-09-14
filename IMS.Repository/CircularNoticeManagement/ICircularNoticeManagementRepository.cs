using IMS.DomainModel.ApplicationClasses.CircularNoticeManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.CircularNoticeManagement
{
    public interface ICircularNoticeManagementRepository
    {
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
        /// Method for fetching the list of all circular/notice - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <returns></returns>
        Task<List<CircularNoticeAc>> GetAllCircularNoticeAsync(int currentUserInstituteId);

        /// <summary>
        /// Method for fetching a particular circular/notice by id - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="noticeId"></param>
        /// <returns></returns>
        Task<CircularNoticeAc> GetCircularNoticeByIdAsync(int currentUserInstituteId, int noticeId);

        /// <summary>
        /// Method for adding new circular/notice - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="addedCircularNoticeAc"></param>
        /// <returns></returns>
        Task<dynamic> AddNewCircularNoticeAsync(int currentUserInstituteId, CircularNoticeAc addedCircularNoticeAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing circular/notice - RS
        /// </summary>
        /// <param name="currentUserInstituteId"></param>
        /// <param name="updatedCircularNoticeAc"></param>
        /// <returns></returns>
        Task<dynamic> UpdateCircularNoticeAsync(int currentUserInstituteId, CircularNoticeAc updatedCircularNoticeAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for deleting a notice - RS
        /// </summary>
        /// <param name="noticeId"></param>
        /// <param name="instituteId"></param>
        /// <returns></returns>
        Task<dynamic> DeleteCircularNoticeAsync(int noticeId, int instituteId);
    }
}
