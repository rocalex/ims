using IMS.DomainModel.ApplicationClasses.StaffManagement;
using IMS.DomainModel.ApplicationClasses.UserManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.StaffPlannerManagement
{
    public interface IStaffPlannerManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all staff plans
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<StaffPlannerAc>> GetAllStaffPlansAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching a staff plan by id
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<StaffPlannerAc> GetStaffPlanByIdAsync(int plannerId, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new staff plan
        /// </summary>
        /// <param name="newStaffActnewStaffPlanivity"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> AddStaffPlanAsync(StaffPlannerAc newStaffPlanAc, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating an existing staff plan
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="updatedStaffPlan"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> UpdateStaffPlanAsync(int planId, StaffPlannerAc updatedStaffPlanAc, ApplicationUser currentUser);

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
    }
}
