using IMS.DomainModel.ApplicationClasses.InstituteWeekOff;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteWeekOffManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class WeekOffManagementController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly IInstituteWeekOffManagementRepository _instituteWeekOffManagementRepository;
        private readonly UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public WeekOffManagementController(IInstituteWeekOffManagementRepository instituteWeekOffManagementRepository,
            UserManager<ApplicationUser> userManager)
        {
            _instituteWeekOffManagementRepository = instituteWeekOffManagementRepository;
            _userManager = userManager;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the week offs by academic year id
        /// </summary>
        /// <param name="academicYearId"></param>
        /// <returns></returns>
        [HttpGet("{academicYearId}")]
        public async Task<IActionResult> GetWeekOffsByAcademicYearIdAsync(int academicYearId)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            var result = await _instituteWeekOffManagementRepository.GetWeekOffsByAcademicYearIdAsync(academicYearId, currentUser);
            return Ok(result);
        }

        /// <summary>
        /// Method for bulk update of week offs
        /// </summary>
        /// <param name="updatedWeekOffs"></param>
        /// <returns></returns>
        [HttpPut("")]
        public async Task<IActionResult> BulkUpdateWeekOff([FromBody] List<InstituteWeekOffAc> updatedWeekOffs)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            await _instituteWeekOffManagementRepository.BulkUpdateWeekOff(updatedWeekOffs, currentUser);
            return Ok(new { Message = "Week offs updated successfully" });
        }

        #endregion
    }
}
