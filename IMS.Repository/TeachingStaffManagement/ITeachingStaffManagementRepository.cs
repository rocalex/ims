using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.TeachingStaffManagementManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.TeachingStaffManagement
{
    public interface ITeachingStaffManagementRepository
    {
        /// <summary>
        /// Method to seed data for institute - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        Task SeedTeachingStaffAsync(int instituteId);

        /// <summary>
        /// Method to get teaching staffs - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of teaching staffs</returns>
        Task<List<TeachingStaff>> GetAllTeachingStaffsAsync(int instituteId);

        /// <summary>
        /// Method to add TeachingStaff - SS
        /// </summary>
        /// <param name="addTeachingStaff">TeachingStaff</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddTeachingStaffAsync(AddTeachingStaffManagementAc addTeachingStaff, int instituteId);

        /// <summary>
        /// Method to update TeachingStaff - SS
        /// </summary>
        /// <param name="updateTeachingStaffManagement">TeachingStaff detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateTeachingStaffAsync(UpdateTeachingStaffManagementAc updateTeachingStaffManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
