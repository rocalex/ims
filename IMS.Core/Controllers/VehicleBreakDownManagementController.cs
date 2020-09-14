using IMS.DomainModel.ApplicationClasses.VehicleBreakDownManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.VehicleBreakDownManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class VehicleBreakDownManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVehicleBreakDownManagementRepository _vehicleBreakDownManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public VehicleBreakDownManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IVehicleBreakDownManagementRepository vehicleBreakDownManagementRepository,
            IMSDbContext imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _vehicleBreakDownManagementRepository = vehicleBreakDownManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddVehicleBreakDownAsync([FromBody]AddVehicleBreakDownManagementAc addVehicleBreakDown)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleBreakDownManagementRepository.AddVehicleBreakDownAsync(addVehicleBreakDown, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetVehicleBreakDownsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _vehicleBreakDownManagementRepository.GetVehicleBreakDownsAsync(instituteId));
        }

        [HttpGet("{vehicleBreakDownId}")]
        public async Task<IActionResult> GetVehicleBreakDownAsync(int vehicleBreakDownId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicleBreakDown = await _imsDbContext.VehicleBreakDowns.FirstOrDefaultAsync(x => x.Id == vehicleBreakDownId && x.Vehicle.InstituteId == instituteId);
            if (vehicleBreakDown != null)
                return Ok(vehicleBreakDown);
            else
                return Ok(new { Message = "Vehicle break down not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateVehicleBreakDownAsync([FromBody]UpdateVehicleBreakDownManagementAc updateVehicleBreakDown)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleBreakDownManagementRepository.UpdateVehicleBreakDownAsync(updateVehicleBreakDown, user));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicles = await _imsDbContext.VehicleMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
            var drivers = await _imsDbContext.DriverMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
            var vehicleDriverMappings = await _imsDbContext.VehicleDriverMappings.Where(x => x.Vehicle.InstituteId == instituteId).ToListAsync();
            return Ok(new { vehicles, drivers, vehicleDriverMappings });
        }
        #endregion
    }
}
