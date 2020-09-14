using IMS.DomainModel.ApplicationClasses.BloodGroupManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.BloodGroupManagement
{
    public interface IBloodGroupManagementRepository
    {
        /// <summary>
        /// Method to add BloodGroup - SS
        /// </summary>
        /// <param name="addBloodGroup">Blood Group</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddBloodGroupAsync(AddBloodGroupManagementAc addBloodGroup, int instituteId);

        /// <summary>
        /// Method to get list of BloodGroup by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<BloodGroup>> GetAllBloodGroupAsync(int instiuteId);

        /// <summary>
        /// Method to update BloodGroup - SS
        /// </summary>
        /// <param name="updateBloodGroupManagement">BloodGroup detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateBloodGroupAsync(UpdateBloodGroupManagementAc updateBloodGroupManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
