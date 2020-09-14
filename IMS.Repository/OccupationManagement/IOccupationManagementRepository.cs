using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.OccupationManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.OccupationManagement
{
    public interface IOccupationManagementRepository
    {
        /// <summary>
        /// Method to add Occupation - SS
        /// </summary>
        /// <param name="addOccupation">Occupation</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddOccupationAsync(AddOccupationManagementAc addOccupation, int instituteId);

        /// <summary>
        /// Method to get list of Occupation by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Occupation>> GetAllOccupationAsync(int instiuteId);

        /// <summary>
        /// Method to update Occupation - SS
        /// </summary>
        /// <param name="updateOccupationManagement">Occupation detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateOccupationAsync(UpdateOccupationManagementAc updateOccupationManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
