using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.ReligionManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.ReligionManagement
{
    public interface IReligionManagementRepository
    {
        /// <summary>
        /// Method to add religion - SS
        /// </summary>
        /// <param name="name">name of religion</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddReligionAsync(AddReligionManagementAc addReligion, int instituteId);

        /// <summary>
        /// Method to get list of religion by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Religion>> GetAllReligionAsync(int instiuteId);

        /// <summary>
        /// Method to update religion - SS
        /// </summary>
        /// <param name="updateReligionManagement">religion detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateReligionAsync(UpdateReligionManagementAc updateReligionManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
