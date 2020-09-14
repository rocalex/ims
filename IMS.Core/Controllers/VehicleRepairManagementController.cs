using IMS.DomainModel.ApplicationClasses.VehicleRepairManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.VehicleRepairManagement;
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
    public class VehicleRepairManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVehicleRepairManagementRepository _vehicleRepairManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public VehicleRepairManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IVehicleRepairManagementRepository vehicleRepairManagementRepository,
            IMSDbContext imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _vehicleRepairManagementRepository = vehicleRepairManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddVehicleRepairAsync([FromBody]AddVehicleRepairManagementAc addVehicleRepair)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleRepairManagementRepository.AddVehicleRepairAsync(addVehicleRepair, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetVehicleRepairsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _vehicleRepairManagementRepository.GetVehicleRepairsAsync(instituteId));
        }

        [HttpGet("{vehicleRepairId}")]
        public async Task<IActionResult> GetVehicleRepairAsync(int vehicleRepairId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicleMaintenance = await _imsDbContext.VehicleRepairs.FirstOrDefaultAsync(x => x.Id == vehicleRepairId && x.Vehicle.InstituteId == instituteId);
            if (vehicleMaintenance != null)
                return Ok(vehicleMaintenance);
            else
                return Ok(new { Message = "Vehicle repair not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateVehicleRepairAsync([FromBody]UpdateVehicleRepairManagementAc updateVehicleRepair)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleRepairManagementRepository.UpdateVehicleRepairAsync(updateVehicleRepair, user));
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
