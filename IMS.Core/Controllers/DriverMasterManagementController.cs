using IMS.DomainModel.ApplicationClasses.DriverMasterManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.DriverMasterManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class DriverMasterManagementController : BaseController
    {
        #region Private Variable(s)

        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDriverMasterManagementRepository _driverMasterManagementRepository;
        private readonly IMSDbContext _imsDbContext;

        #endregion

        #region Constructor

        public DriverMasterManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IDriverMasterManagementRepository driverMasterManagementRepository, IMSDbContext
            imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _driverMasterManagementRepository = driverMasterManagementRepository;
            _imsDbContext = imsDbContext;
        }

        #endregion

        #region Public Method(s)

        [HttpPost("")]
        public async Task<IActionResult> AddDriverMasterAsync([FromBody]AddDriverMasterManagementAc addDriverMaster)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _driverMasterManagementRepository.AddDriverMasterAsync(addDriverMaster, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetDriverMastersAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _driverMasterManagementRepository.GetDriverMastersAsync(instituteId));
        }

        [HttpGet("{driverId}")]
        public async Task<IActionResult> GetDriverMasterAsync(int driverId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var driver = await _imsDbContext.DriverMasters.FirstOrDefaultAsync(x => x.Id == driverId && x.InstituteId == instituteId);
            if (driver != null)
                return Ok(driver);
            else
                return Ok(new { Message = "Driver not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateDriverMasterAsync([FromBody]UpdateDriverMasterManagementAc updateDriverMaster)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _driverMasterManagementRepository.UpdateDriverMasterAsync(updateDriverMaster, user));
        }

        [HttpPost("image/{driverId}")]
        public async Task<IActionResult> AddOrUpdateImagesAsync(int driverId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            await _driverMasterManagementRepository.AddOrUpdateImageAsync(Request.Form.Files, driverId, instituteId);
            return Ok();
        }

        [HttpGet("dashboard")]
        public async Task<IActionResult> GetDriverDashboardDetails()
        {
            string currentUserId = (await _userManager.FindByNameAsync(User.Identity.Name)).Id;
            int currentUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();

            return Ok(await _driverMasterManagementRepository.GetDriverDashboardDetails(currentUserId, currentUserInstituteId));
        }

        #endregion
    }
}
