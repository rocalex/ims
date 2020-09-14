using IMS.DomainModel.ApplicationClasses.InstituteLanguageMasterManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteLanguageMasterManagement
{
    public interface IInstituteLanguageMasterManagementRepository
    {
        /// <summary>
        /// Method to add InstituteLanguageMaster - SS
        /// </summary>
        /// <param name="addInstituteLanguageMaster">Blood Group</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddInstituteLanguageMasterAsync(AddInstituteLanguageMasterManagementAc addInstituteLanguageMaster, int instituteId);

        /// <summary>
        /// Method to get list of InstituteLanguageMaster by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<InstituteLanguageMaster>> GetAllInstituteLanguageMasterAsync(int instiuteId);

        /// <summary>
        /// Method to update InstituteLanguageMaster - SS
        /// </summary>
        /// <param name="updateInstituteLanguageMasterManagement">InstituteLanguageMaster detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateInstituteLanguageMasterAsync(UpdateInstituteLanguageMasterManagementAc updateInstituteLanguageMasterManagement, int instituteId);
    }
}
