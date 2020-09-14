using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.QualificationManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.QualificationManagement
{
    public interface IQualificationManagementRepository
    {
        /// <summary>
        /// Method to add Qualification - SS
        /// </summary>
        /// <param name="addQualification">Qualification</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddQualificationAsync(AddQualificationManagementAc addQualification, int instituteId);

        /// <summary>
        /// Method to get list of Qualification by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Qualification>> GetAllQualificationAsync(int instiuteId);

        /// <summary>
        /// Method to update Qualification - SS
        /// </summary>
        /// <param name="updateQualificationManagement">Qualification detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateQualificationAsync(UpdateQualificationManagementAc updateQualificationManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
