using IMS.DomainModel.ApplicationClasses.SectionManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.SectionManagement
{
    public interface ISectionManagementRepository
    {
        /// <summary>
        /// Method to add Section - SS
        /// </summary>
        /// <param name="addSection">Section</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddSectionAsync(AddSectionManagementAc addSection, int instituteId);

        /// <summary>
        /// Method to get list of Section by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Section>> GetAllSectionAsync(int instiuteId);

        /// <summary>
        /// Method to update Section - SS
        /// </summary>
        /// <param name="updateSectionManagement">Section detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateSectionAsync(UpdateSectionManagementAc updateSectionManagement, int instituteId);
    }
}
