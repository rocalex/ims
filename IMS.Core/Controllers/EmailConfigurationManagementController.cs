using IMS.DomainModel.Models;
using IMS.Repository.EmailConfigurationManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class EmailConfigurationManagementController : Controller
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly IEmailConfigurationManagementRepository _emailConfigurationManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public EmailConfigurationManagementController(IEmailConfigurationManagementRepository emailConfigurationManagementRepository,
            UserManager<ApplicationUser> userManager)
        {
            _emailConfigurationManagementRepository = emailConfigurationManagementRepository;
            _userManager = userManager;
        }

        #endregion

        #region Public Method(s)

        /// <summary>
        /// Method for fetching the list of all email configurations
        /// </summary>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAllEmailConfigurationsAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _emailConfigurationManagementRepository.GetAllEmailConfigurationsAsync(currentUser));
        }

        /// <summary>
        /// Method for fetching email configuration by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmailConfigurationByIdAsync(int id)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _emailConfigurationManagementRepository.GetEmailConfigurationByIdAsync(id, currentUser));
        }

        /// <summary>
        /// Method for adding new email configuration
        /// </summary>
        /// <param name="newDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddEmailConfigurationAsync([FromBody] AdministrationEmailConfiguration newEmailConfiguration)
        {
            if (string.IsNullOrEmpty(newEmailConfiguration.HostName))
            {
                return Ok(new { Message = "Host name can not be null or empty", HasError = true });
            }
            else if(newEmailConfiguration.PortNumber == 0)
            {
                return Ok(new { Message = "Port number can not be null or empty", HasError = true });
            }
            else if (string.IsNullOrEmpty(newEmailConfiguration.MailUserName))
            {
                return Ok(new { Message = "Email can not be null or empty", HasError = true });
            }
            else if (string.IsNullOrEmpty(newEmailConfiguration.MailPassword))
            {
                return Ok(new { Message = "Password can not be null or empty", HasError = true });
            }

            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            await _emailConfigurationManagementRepository.AddEmailConfigurationAsync(newEmailConfiguration, currentUser);
            return Ok(new { Message = "Email Configuration added successfully" });
        }

        /// <summary>
        /// Method for updating email configuration
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedDesignation"></param>
        /// <param name="currentUser"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmailConfigurationAsync(int id, [FromBody] AdministrationEmailConfiguration updatedEmailConfiguration)
        {
            if (string.IsNullOrEmpty(updatedEmailConfiguration.HostName))
            {
                return Ok(new { Message = "Host name can not be null or empty", HasError = true });
            }
            else if (updatedEmailConfiguration.PortNumber == 0)
            {
                return Ok(new { Message = "Port number can not be null or empty", HasError = true });
            }
            else if (string.IsNullOrEmpty(updatedEmailConfiguration.MailUserName))
            {
                return Ok(new { Message = "Email can not be null or empty", HasError = true });
            }
            else if (string.IsNullOrEmpty(updatedEmailConfiguration.MailPassword))
            {
                return Ok(new { Message = "Password can not be null or empty", HasError = true });
            }

            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _emailConfigurationManagementRepository.UpdateEmailConfigurationAsync(id, updatedEmailConfiguration, currentUser));
        }

        #endregion
    }
}
