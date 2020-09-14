using IMS.DomainModel.ApplicationClasses.TransportationStageManagement;
using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.TransportationStageManagement
{
    public interface ITransportationStageManagementRepository
    {
        /// <summary>
        /// Method to add stage - SS
        /// </summary>
        /// <param name="addTransportationStage">stage detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<TransportationStageManagementResponse> AddTransportationStageAsync(AddTransportationStageManagementAc
            addTransportationStage, ApplicationUser loggedInUser);

        /// <summary>
        /// Method to list of stages - SS
        /// </summary>
        /// <param name="instituteId">institute id</param>
        /// <returns>list of stages</returns>
        Task<List<TransportationStage>> GetTransportationStagesAsync(int instituteId);

        /// <summary>
        /// Method to update stage - SS
        /// </summary>
        /// <param name="updateTransportationStage">stage detail</param>
        /// <param name="loggedInUser">logged in user</param>
        /// <returns>response</returns>
        Task<TransportationStageManagementResponse> UpdateTransportationStageAsync(UpdateTransportationStageManagementAc
            updateTransportationStage, ApplicationUser loggedInUser);
    }
}
