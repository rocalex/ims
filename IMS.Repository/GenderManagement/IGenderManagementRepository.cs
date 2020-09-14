using IMS.DomainModel.ApplicationClasses.GenderManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.GenderManagement
{
    public interface IGenderManagementRepository
    {
        /// <summary>
        /// Method to add Gender - SS
        /// </summary>
        /// <param name="addGender">Gender</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddGenderAsync(AddGenderManagementAc addGender, int instituteId);

        /// <summary>
        /// Method to get list of Gender by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Gender>> GetAllGenderAsync(int instiuteId);

        /// <summary>
        /// Method to update Gender - SS
        /// </summary>
        /// <param name="updateGenderManagement">Gender detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateGenderAsync(UpdateGenderManagementAc updateGenderManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
