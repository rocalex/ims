using IMS.DomainModel.ApplicationClasses.ActivityStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.ActivityStatusManagement
{
    public interface IActivityStatusManagementRepository
    {
        /// <summary>
        /// Method to add Activity Status - RS
        /// </summary>
        /// <param name="addActivityStatus">Slab</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddActivityStatusAsync(AddActivityStatusAC addActivityStatus, int instituteId);

        /// <summary>
        /// Method to get list of Activity Status by institute id - RS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<ActivityStatus>> GetAllActivityStatusAsync(int instiuteId, ApplicationUser currentUser);

        /// <summary>
        /// Method to update Activity Status - RS
        /// </summary>
        /// <param name="updateMeetingAgenda">Slab detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateActivityStatusAsync(UpdateActivityStatusAC updateActivityStatus, int instituteId);
    }
}
