using IMS.DomainModel.ApplicationClasses.InstituteAcademicYear;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteAcademicYearManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Route(BaseUrl)]
    public class InstituteAcademicYearManagementController : Controller
    {
        #region Private variables

        private const string BaseUrl = "api/[controller]";
        private IInstituteAcademicYearManagementRepository _instituteAcademicYearManagementRepository;
        private readonly IInstituteUserMappingHelperService _instituteUserMappingHelperService;
        private UserManager<ApplicationUser> _userManager;

        #endregion

        #region Constructor

        public InstituteAcademicYearManagementController(IInstituteAcademicYearManagementRepository instituteAcademicYearManagementRepository,
            IInstituteUserMappingHelperService instituteUserMappingHelperService,
            UserManager<ApplicationUser> userManager,
            IMSDbContext imsDbContext)
        {
            _instituteAcademicYearManagementRepository = instituteAcademicYearManagementRepository;
            _instituteUserMappingHelperService = instituteUserMappingHelperService;
            _userManager = userManager;
        }

        #endregion

        #region Public methods

        /// <summary>
        /// Method for fetching the list of all academic years
        /// </summary>
        /// <returns></returns>
        [HttpGet("")]
        public async Task<IActionResult> GetAcademicYearsListAsync()
        {
            ApplicationUser currentUser = await _userManager.FindByNameAsync(User.Identity.Name);
            int currentUserInstituteId = await _instituteUserMappingHelperService.GetUserCurrentSelectedInstituteIdAsync(currentUser.Id, true);
            return Ok(await _instituteAcademicYearManagementRepository.GetAcademicYearsListAsync(currentUserInstituteId));
        }

        /// <summary>
        /// Method for fetching the details of an academic year by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetAcademicYearByIdAsync(int id)
        {
            ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
            InstituteAcademicYear instituteAcademicYear = await _instituteAcademicYearManagementRepository.GetAcademicYearByIdAsync(id, currentUser);

            if (instituteAcademicYear == null)
            {
                return Ok(new { Message = "No academic year found with this id", HasError = true });
            }

            return Ok(instituteAcademicYear);
        }

        /// <summary>
        /// Method for adding new academic year
        /// </summary>
        /// <param name="newAcademicYearAc"></param>
        /// <returns></returns>
        [HttpPost("")]
        [Authorize]
        public async Task<IActionResult> AddAcademicYearAsync([FromBody] AddInstituteAcademicYearAc newAcademicYearAc)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
                return Ok(await _instituteAcademicYearManagementRepository.AddAcademicYearAsync(newAcademicYearAc, currentUser));
            }
            else if (string.IsNullOrEmpty(newAcademicYearAc.AcademicYearCode))
            {
                return Ok(new { Message = "Year Code can not be null or empty", HasError = true });
            }
            else if (string.IsNullOrEmpty(newAcademicYearAc.ChallanStartingNumber))
            {
                return Ok(new { Message = "Starting Challan number can not be null or empty", HasError = true });
            }
            else
            {
                return Ok(new { Message = "From Date and To Date can not by null or empty", HasError = true });
            }
        }

        /// <summary>
        /// Method for updating an academic year
        /// </summary>
        /// <param name="id"></param>
        /// <param name="updatedAcademicYearAc"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateAcademicYearAsync(int id, [FromBody] AddInstituteAcademicYearAc updatedAcademicYearAc)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser currentUser = await _userManager.FindByEmailAsync(User.Identity.Name);
                return Ok(await _instituteAcademicYearManagementRepository.UpdateAcademicYearAsync(id, updatedAcademicYearAc, currentUser));
            }
            else if (string.IsNullOrEmpty(updatedAcademicYearAc.AcademicYearCode))
            {
                return Ok(new { Message = "Year Code can not be null or empty", HasError = true });
            }
            else if (string.IsNullOrEmpty(updatedAcademicYearAc.ChallanStartingNumber))
            {
                return Ok(new { Message = "Starting Challan number can not be null or empty", HasError = true });
            }
            else
            {
                return Ok(new { Message = "From Date and To Date can not by null or empty", HasError = true });
            }
        }

        #endregion
    }
}
