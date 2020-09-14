using IMS.DomainModel.ApplicationClasses.CasteManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.CasteManagement
{
    public interface ICasteManagementRepository
    {
        /// <summary>
        /// Method to add Caste - SS
        /// </summary>
        /// <param name="addCaste">Caste</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddCasteAsync(AddCasteManagementAc addCaste, int instituteId);

        /// <summary>
        /// Method to get list of Caste by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Caste>> GetAllCasteAsync(int instiuteId);

        /// <summary>
        /// Method to update Caste - SS
        /// </summary>
        /// <param name="updateCasteManagement">Caste detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateCasteAsync(UpdateCasteManagementAc updateCasteManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
