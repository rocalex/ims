using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.LookUpManagement
{
    public interface ILookUpManagementRepository
    {
        /// <summary>
        /// Method to get all look up - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of look ups</returns>
        Task<List<LookUp>> GetAllLookUpsAsync(int instituteId);

        /// <summary>
        /// Method to add look up mapping - SS
        /// </summary>
        /// <param name="addLookUpManagement">look up details</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>response</returns>
        Task<LookUpManagementResponse> AddLookUpMappingAsync(AddLookUpManagementAc addLookUpManagement, int instituteId);

        /// <summary>
        /// Method to get all look up mappings - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of look ups</returns>
        Task<List<LookUpMapping>> GetAllLookUpMappingAsync(int instituteId);

        /// <summary>
        /// Method to update look up mapping - SS
        /// </summary>
        /// <param name="updateLookUpManagement">look up detail</param>
        /// <param name="instituteId">isntitute id</param>
        /// <returns>response</returns>
        Task<LookUpManagementResponse> UpdateLookUpMappingAsync(UpdateLookUpManagementAc updateLookUpManagement, int instituteId);
    }
}
