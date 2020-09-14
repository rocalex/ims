using IMS.DomainModel.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Repository.EmailConfigurationManagement
{
    public interface IEmailConfigurationManagementRepository
    {
        /// <summary>
        /// Method for fetching the list of all email configurations
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<List<AdministrationEmailConfiguration>> GetAllEmailConfigurationsAsync(ApplicationUser currentUser);

        /// <summary>
        /// Method for fetching email configuration by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<AdministrationEmailConfiguration> GetEmailConfigurationByIdAsync(int id, ApplicationUser currentUser);

        /// <summary>
        /// Method for adding new email configuration
        /// </summary>
        /// <param name="newEmailConfiguration"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task AddEmailConfigurationAsync(AdministrationEmailConfiguration newEmailConfiguration, ApplicationUser currentUser);

        /// <summary>
        /// Method for updating email configuration
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedEmailConfiguration"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        Task<dynamic> UpdateEmailConfigurationAsync(int id, AdministrationEmailConfiguration updatedEmailConfiguration, ApplicationUser currentUser);
    }
}
