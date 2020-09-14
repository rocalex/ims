using IMS.DomainModel.ApplicationClasses.InstituteNationalityManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteNationalityManagement
{
    public interface IInstituteNationalityManagementRepository
    {
        /// <summary>
        /// Method to add nationality - SS
        /// </summary>
        /// <param name="addInstitute">nation</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddInstituteNationalityAsync(AddInstituteNationalityAc addInstitute, int instituteId);

        /// <summary>
        /// Method to get list of nationality - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of nation</returns>
        Task<List<InstituteNationality>> GetAllInstituteNationalityAsync(int instituteId);

        /// <summary>
        /// Method to update nationality - SS
        /// </summary>
        /// <param name="updateInstituteNationality">nation detail</param>
        /// <param name="instituteId">institue id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateInstituteNationalityAsync(UpdateInstituteNationalityAc updateInstituteNationality, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
