using IMS.DomainModel.ApplicationClasses.InstituteClassManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteClassManagement
{
    public interface IInstituteClassManagementRepository
    {
        /// <summary>
        /// Method to add institute class - SS
        /// </summary>
        /// <param name="addInstituteClass">class detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<InstituteClassResponse> AddInstituteClassAsync(AddInstituteClassManagementAc addInstituteClass, int instituteId);

        /// <summary>
        /// Method to get all institute classes by institute id - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of classes</returns>
        Task<List<InstituteClass>> GetAllInstituteClassesAsync(int instituteId);

        /// <summary>
        /// Method to update class - SS
        /// </summary>
        /// <param name="updateInstituteClass">class detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<InstituteClassResponse> UpdateInstituteClassAsync(UpdateInstituteClassManagementAc updateInstituteClass, int instituteId);
    }
}
