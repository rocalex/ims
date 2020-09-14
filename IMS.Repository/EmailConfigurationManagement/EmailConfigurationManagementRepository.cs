using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Repository.EmailConfigurationManagement
{
    public class EmailConfigurationManagementRepository : IEmailConfigurationManagementRepository
    {
        #region Private variables

        private readonly IMSDbContext _imsDbContext;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;

        #endregion

        #region Constructor

        public EmailConfigurationManagementRepository(IMSDbContext imsDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService)
        {
            _imsDbContext = imsDbContext;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all departments
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<List<AdministrationEmailConfiguration>> GetAllEmailConfigurationsAsync(ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return (await _imsDbContext.AdministrationEmailConfigurations.Where(x => x.InstituteId == currentUserInstituteId).ToListAsync());
        }

        /// <summary>
        /// Method for fetching department by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<AdministrationEmailConfiguration> GetEmailConfigurationByIdAsync(int id, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return await _imsDbContext.AdministrationEmailConfigurations.FirstOrDefaultAsync(x => x.Id == id && x.InstituteId == currentUserInstituteId);
        }

        /// <summary>
        /// Method for adding new department
        /// </summary>
        /// <param name="newEmailConfiguration"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task AddEmailConfigurationAsync(AdministrationEmailConfiguration newEmailConfiguration, ApplicationUser currentUser)
        {
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);

            newEmailConfiguration.InstituteId = currentUserInstituteId;
            newEmailConfiguration.CreatedBy = currentUser.Id;
            newEmailConfiguration.CreatedOn = DateTime.UtcNow;
            _imsDbContext.AdministrationEmailConfigurations.Add(newEmailConfiguration);
            await _imsDbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Method for updating department
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedEmailConfiguration"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        public async Task<dynamic> UpdateEmailConfigurationAsync(int id, AdministrationEmailConfiguration updatedEmailConfiguration, ApplicationUser currentUser)
        {
            AdministrationEmailConfiguration emailConfiguration = await GetEmailConfigurationByIdAsync(id, currentUser);
            if (emailConfiguration == null)
            {
                return new { Message = "No email configuration exists with this id", HasError = true };
            }

            emailConfiguration.Name = updatedEmailConfiguration.Name;
            emailConfiguration.HostName = updatedEmailConfiguration.HostName;
            emailConfiguration.PortNumber = updatedEmailConfiguration.PortNumber;
            emailConfiguration.EnableSsl = updatedEmailConfiguration.EnableSsl;
            emailConfiguration.MailUserName = updatedEmailConfiguration.MailUserName;
            emailConfiguration.MailPassword = updatedEmailConfiguration.MailPassword;
            emailConfiguration.UpdatedBy = currentUser.Id;
            emailConfiguration.UpdatedAt = DateTime.UtcNow;
            _imsDbContext.AdministrationEmailConfigurations.Update(emailConfiguration);
            await _imsDbContext.SaveChangesAsync();

            return new { Message = "Email configuration updated successfully" };
        }

        #endregion

        #region Private methods



        #endregion
    }
}
