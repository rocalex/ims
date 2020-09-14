using IMS.DomainModel.ApplicationClasses.DisciplinaryManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.DisciplinaryManagement
{
    public interface IDisciplinaryManagementRepository
    {
        /// <summary>
        /// Method to add disciplinary - SS
        /// </summary>
        /// <param name="addDisciplinary">disciplinary</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<DisciplinaryManagementResponse> AddDisciplinaryAsync(AddDisciplinaryManagementAc addDisciplinary,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get disciplinaries - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of disciplinaries</returns>
        Task<List<Disciplinary>> GetDisciplinariesAsync(int instituteId);

        /// <summary>
        /// Method to update disciplinary - SS
        /// </summary>
        /// <param name="updateDisciplinary">disciplinary</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<DisciplinaryManagementResponse> UpdateDisciplinaryAsync(UpdateDisciplinaryManagementAc updateDisciplinary,
            ApplicationUser loggedInUser);
    }
}
