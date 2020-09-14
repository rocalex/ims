using IMS.DomainModel.ApplicationClasses.DisciplinaryStatusManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.DisciplinaryStatusManagement
{
    public interface IDisciplinaryStatusManagementRepository
    {
        /// <summary>
        /// Method to seed Disciplinary status - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        Task SeedDisciplinaryStatusAsync(int instituteId);

        /// <summary>
        /// Method to add Disciplinary Status - SS
        /// </summary>
        /// <param name="name">name of DisciplinaryStatus</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddDisciplinaryStatusAsync(AddDisciplinaryStatusManagementAc addDisciplinaryStatus,
            int instituteId);

        /// <summary>
        /// Method to get list of Disciplinary Status by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<DisciplinaryStatus>> GetAllDisciplinaryStatusAsync(int instiuteId);

        /// <summary>
        /// Method to update Disciplinary Status - SS
        /// </summary>
        /// <param name="updateDisciplinaryStatusManagement">DisciplinaryStatus detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateDisciplinaryStatusAsync(UpdateDisciplinaryStatusManagementAc 
            updateDisciplinaryStatusManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
