using IMS.DomainModel.ApplicationClasses.InstituteManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteManagement
{
    public interface IInstituteManagementRepository
    {
        /// <summary>
        /// Method to add institute - SS
        /// </summary>
        /// <param name="addInstitute">institute information</param>
        Task AddInstituteAsync(AddInstituteAc addInstitute);

        /// <summary>
        /// Method to get all institute details - SS
        /// </summary>
        /// <returns>list of institute</returns>
        Task<List<GetInstituteDetailAc>> GetAllInstituteAsync();

        /// <summary>
        /// Method to migrated existing data - SS
        /// </summary>
        Task MigratingExistingDataAsync();

        /// <summary>
        /// Method for fetching the list of all institutes mapped with the logged in user - RS
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<GetInstituteDetailAc>> GetAllLoggedInUserInstitutesAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method to update institue - SS
        /// </summary>
        /// <param name="updateInstitute">institute detail</param>
        /// <returns>response</returns>
        Task<InstituteResponseAc> UpdateInstituteAsync(UpdateInstituteAc updateInstitute);
    }
}
