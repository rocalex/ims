using IMS.DomainModel.ApplicationClasses.VehicleMaintenanceManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.VehicleMaintenanceManagement;
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
    public class VehicleMaintenanceManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVehicleMaintenanceManagementRepository _vehicleMaintenanceManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public VehicleMaintenanceManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IVehicleMaintenanceManagementRepository vehicleMaintenanceManagementRepository,
            IMSDbContext imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _vehicleMaintenanceManagementRepository = vehicleMaintenanceManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddVehicleMaintenanceAsync([FromBody]AddVehicleMaintenanceManagementAc addVehicleMaintenance)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleMaintenanceManagementRepository.AddVehicleMaintenanceAsync(addVehicleMaintenance, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetVehicleMaintenancesAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _vehicleMaintenanceManagementRepository.GetVehicleMaintenancesAsync(instituteId));
        }

        [HttpGet("{vehicleMaintenanceId}")]
        public async Task<IActionResult> GetVehicleMaintenanceAsync(int vehicleMaintenanceId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicleMaintenance = await _imsDbContext.VehicleMaintenances.FirstOrDefaultAsync(x => x.Id == vehicleMaintenanceId && x.Vehicle.InstituteId == instituteId);
            if (vehicleMaintenance != null)
                return Ok(vehicleMaintenance);
            else
                return Ok(new { Message = "Vehicle maintenance not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateVehicleMaintenanceAsync([FromBody]UpdateVehicleMaintenanceManagementAc updateVehicleMaintenance)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleMaintenanceManagementRepository.UpdateVehicleMaintenanceAsync(updateVehicleMaintenance, user));
        }

        [HttpGet("initialdata")]
        public async Task<IActionResult> GetInitialDataAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicles = await _imsDbContext.VehicleMasters.Where(x => x.InstituteId == instituteId).ToListAsync();
            return Ok(new { vehicles });
        }
        #endregion
    }
}
