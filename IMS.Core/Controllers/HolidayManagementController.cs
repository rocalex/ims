using IMS.DomainModel.ApplicationClasses.InstituteHolidays;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteHolidayManagement;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class HolidayManagementController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IInstituteHolidayManagementRepository _instituteHolidayManagementRepository;
        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public HolidayManagementController(UserManager<ApplicationUser> userManager,
            IInstituteHolidayManagementRepository instituteHolidayManagementRepository,
            IMSDbContext imsDbContext)
        {
            _userManager = userManager;
            _instituteHolidayManagementRepository = instituteHolidayManagementRepository;
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list off holidays by selected academic year
        /// </summary>
        /// <param name="academicYearId"></param>
        /// <returns></returns>
        [HttpGet("academicyear/{academicYearId}")]
        public async Task<IActionResult> GetHolidaysByAcademicYearIdAsync(int academicYearId)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            return Ok(await _instituteHolidayManagementRepository.GetHolidaysByAcademicYearIdAsync(academicYearId, currentUser));
        }

        /// <summary>
        /// Method for fetching the list of all occurance types
        /// </summary>
        /// <returns></returns>
        [HttpGet("{academicYearId}/occurance/all")]
        public async Task<IActionResult> GetOccuranceTypesListAsync(int academicYearId)
        {
            List<HolidayOccuranceTypeEnumDetailsListAc> holidayOccuranceTypeEnumDetailsList = _instituteHolidayManagementRepository.GetOccuranceTypesList();
            InstituteAcademicYear academicYear = await _imsDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.Id == academicYearId);
            return Ok(new { OccuranceTypesList = holidayOccuranceTypeEnumDetailsList, AcademicYear = academicYear });
        }

        /// <summary>
        /// Method for adding new holiday
        /// </summary>
        /// <param name="newHoliday"></param>
        /// <returns></returns>
        [HttpPost("")]
        public async Task<IActionResult> AddNewHoliday([FromBody] AddHolidayAc newHolidayAc)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
                await _instituteHolidayManagementRepository.AddNewHoliday(newHolidayAc, currentUser);
                return Ok(new { Message = "Holiday added successfully" });
            }
            else if (newHolidayAc.AcademicYearId == 0)
            {
                return Ok(new { Message = "Academic year can not be null or empty", HasError = true });
            }
            else
            {
                return Ok(new { Message = "Holiday date can not be null or empty", HasError = true });
            }
        }

        /// <summary>
        /// Method for fetching the details of the holiday
        /// </summary>
        /// <param name="holidayId"></param>
        /// <returns></returns>
        [HttpGet("holiday/{holidayId}")]
        public async Task<IActionResult> GetHolidayDetailsByIdAsync(int holidayId)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            AddHolidayAc holidayAc = await _instituteHolidayManagementRepository.GetHolidayDetailsByIdAsync(holidayId, currentUser);
            List<HolidayOccuranceTypeEnumDetailsListAc> occuranceTypesList = _instituteHolidayManagementRepository.GetOccuranceTypesList();
            InstituteAcademicYear academicYear = await _imsDbContext.InstituteAcademicYears.FirstOrDefaultAsync(x => x.Id == holidayAc.AcademicYearId);

            return Ok(new { Holiday = holidayAc, OccuranceTypesList = occuranceTypesList, AcademicYear = academicYear });
        }

        /// <summary>
        /// Method for updating holiday
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedHoliday"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHolidayAsync(int id, [FromBody] AddHolidayAc updatedHolidayAc)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
                return Ok(await _instituteHolidayManagementRepository.UpdateHolidayAsync(id, updatedHolidayAc, currentUser));
            }
            else if (updatedHolidayAc.AcademicYearId == 0)
            {
                return Ok(new { Message = "Academic year can not be null or empty", HasError = true });
            }
            else
            {
                return Ok(new { Message = "Holiday date can not be null or empty", HasError = true });
            }
        }

        /// <summary>
        /// Method for deleting a holiday
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHolidayAsync(int id)
        {
            return Ok(await _instituteHolidayManagementRepository.DeleteHolidayAsync(id));
        }

        #endregion
    }
}
