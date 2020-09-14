using IMS.DomainModel.ApplicationClasses.InstituteSubjectManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.InstituteSubjectManagement
{
    public interface IInstituteSubjectManagementRepository
    {
        /// <summary>
        /// Method to add institute subject - SS
        /// </summary>
        /// <param name="addInstituteSubject">subject detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<InstituteSubjectResponse> AddInstituteSubjectAsync(AddInstituteSubjectManagementAc addInstituteSubject, int instituteId);

        /// <summary>
        /// Method to get all institute subjects by institute id - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of subjects</returns>
        Task<List<InstituteSubject>> GetAllInstituteSubjectsAsync(int instituteId);

        /// <summary>
        /// Method to update subject - SS
        /// </summary>
        /// <param name="updateInstituteSubject">subject detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<InstituteSubjectResponse> UpdateInstituteSubjectAsync(UpdateInstituteSubjectManagementAc updateInstituteSubject, int instituteId);
    }
}
