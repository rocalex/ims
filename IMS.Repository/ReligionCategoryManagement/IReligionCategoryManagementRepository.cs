using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.ReligionCategoryManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.ReligionCategoryManagement
{
    public interface IReligionCategoryManagementRepository
    {
        /// <summary>
        /// Method to add ReligionCategory - SS
        /// </summary>
        /// <param name="name">name of ReligionCategory</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddReligionCategoryAsync(AddReligionCategoryManagementAc addReligion, int instituteId);

        /// <summary>
        /// Method to get list of ReligionCategory by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<ReligionCategory>> GetAllReligionCategoryAsync(int instiuteId);

        /// <summary>
        /// Method to update ReligionCategory - SS
        /// </summary>
        /// <param name="updateReligionCategoryManagement">ReligionCategory detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateReligionCategoryAsync(UpdateReligionCategoryManagementAc updateReligionCategoryManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
