using IMS.DomainModel.ApplicationClasses.MaritalStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.MaritalStatusManagement
{
    public interface IMaritalStatusManagementRepository
    {
        /// <summary>
        /// Method to add MaritalStatus - SS
        /// </summary>
        /// <param name="addMaritalStatus">MaritalStatus</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddMaritalStatusAsync(AddMaritalStatusManagementAc addMaritalStatus, int instituteId);

        /// <summary>
        /// Method to get list of MaritalStatus by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<MaritalStatus>> GetAllMaritalStatusAsync(int instiuteId);

        /// <summary>
        /// Method to update MaritalStatus - SS
        /// </summary>
        /// <param name="updateMaritalStatusManagement">MaritalStatus detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateMaritalStatusAsync(UpdateMaritalStatusManagementAc updateMaritalStatusManagement, int instituteId);
    }
}
