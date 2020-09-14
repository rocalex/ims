using IMS.DomainModel.ApplicationClasses.AutoSequenceGeneratorManagement;
using IMS.DomainModel.Enums;
using IMS.DomainModel.Models;
using System.Threading.Tasks;

namespace IMS.Repository.AutoSequenceGeneratorManagement
{
    public interface IAutoSequenceGeneratorManagementRepository
    {
        /// <summary>
        /// Method to update auto sequence - SS
        /// </summary>
        /// <param name="updateAutoSequence">auto sequence</param>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <returns>response</returns>
        Task<AutoSequenceGeneratorManagementResponse> UpdateAutoSequenceGeneratorAsync(UpdateAutoSequenceGeneratorManagementAc updateAutoSequence,
            ApplicationUser loggedInUser);

        /// <summary>
        /// Method to get auto sequence data - SS
        /// </summary>
        /// <param name="loggedInUser">logged in user detail</param>
        /// <param name="generatorTypeEnum">auto sequence type</param>
        /// <returns>auto sequence data</returns>
        Task<AutoSequenceGenerator> GetSequenceGeneratorsAsync(ApplicationUser loggedInUser, AutoSequenceGeneratorTypeEnum generatorTypeEnum);

        /// <summary>
        /// Method to generate auto sequence data - SS
        /// </summary>
        /// <param name="instituteId">institue id</param>
        /// <param name="typeEnum">type of data</param>
        /// <returns>response</returns>
        Task<GenerateAutoSequenceDataResponse> GetAutoSequenceNumberByTypeAndInstituteIdAsync(int instituteId, AutoSequenceGeneratorTypeEnum typeEnum);

        /// <summary>
        /// Method to migrated previous data - SS
        /// </summary>
        Task MigratePreviousDataAsync();
    }
}
