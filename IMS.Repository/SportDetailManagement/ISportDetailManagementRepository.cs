using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.ApplicationClasses.SportDetailManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.SportDetailManagement
{
    public interface ISportDetailManagementRepository
    {
        /// <summary>
        /// Method to add SportDetail - SS
        /// </summary>
        /// <param name="name">name of SportDetail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> AddSportDetailAsync(AddSportDetailManagementAc addSport, int instituteId);

        /// <summary>
        /// Method to get list of SportDetail by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<SportDetail>> GetAllSportDetailAsync(int instiuteId);

        /// <summary>
        /// Method to update SportDetail - SS
        /// </summary>
        /// <param name="updateSportDetailManagement">SportDetail detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateSportDetailAsync(UpdateSportDetailManagementAc updateSportDetailManagement, int instituteId);

        /// <summary>
        /// Method to migrated previous data(s) - SS
        /// </summary>
        Task MigratedPreviousDataAsync();
    }
}
