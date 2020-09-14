using IMS.DomainModel.ApplicationClasses.LevelManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.LevelManagement
{
    public interface ILevelManagementRepository
    {
		/// <summary>
		/// Method to add Level - SS
		/// </summary>
		/// <param name="addLevel">Level</param>
		/// <param name="instituteId">institute id</param>
		/// <returns>message</returns>
		Task<SharedLookUpResponse> AddLevelAsync(AddLevelManagementAc addLevel, int instituteId);

        /// <summary>
        /// Method to get list of Level by institute id - SS
        /// </summary>
        /// <param name="instiuteId">institute id</param>
        /// <returns>list of institute</returns>
        Task<List<Level>> GetAllLevelAsync(int instiuteId);

        /// <summary>
        /// Method to update Level - SS
        /// </summary>
        /// <param name="updateLevelManagement">Level detail</param>
        /// <param name="instituteId">institute id</param>
        /// <returns>message</returns>
        Task<SharedLookUpResponse> UpdateLevelAsync(UpdateLevelManagementAc updateLevelManagement, int instituteId);

		/// <summary>
		/// Method to migrated previous data(s) - SS
		/// </summary>
		Task MigratedPreviousDataAsync();

	}
}
