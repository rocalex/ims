using IMS.DomainModel.ApplicationClasses.VehicleAccidentManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.VehicleAccidentManagement;
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
    public class VehicleAccidentManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVehicleAccidentManagementRepository _vehicleAccidentManagementRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public VehicleAccidentManagementController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IVehicleAccidentManagementRepository vehicleAccidentManagementRepository,
            IMSDbContext imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _vehicleAccidentManagementRepository = vehicleAccidentManagementRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddVehicleAccidentAsync([FromBody]AddVehicleAccidentManagementAc addVehicleAccident)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleAccidentManagementRepository.AddVehicleAccidentAsync(addVehicleAccident, user));
        }

        [HttpGet("")]
        public async Task<IActionResult> GetVehicleAccidentsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _vehicleAccidentManagementRepository.GetVehicleAccidentsAsync(instituteId));
        }

        [HttpGet("{vehicleAccidentId}")]
        public async Task<IActionResult> GetVehicleAccidentAsync(int vehicleAccidentId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var vehicleAccident = await _imsDbContext.VehicleAccidents.FirstOrDefaultAsync(x => x.Id == vehicleAccidentId && x.Vehicle.InstituteId == instituteId);
            if (vehicleAccident != null)
                return Ok(vehicleAccident);
            else
                return Ok(new { Message = "Vehicle accident not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateVehicleAccidentAsync([FromBody]UpdateVehicleAccidentManagementAc updateVehicleAccident)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleAccidentManagementRepository.UpdateVehicleAccidentAsync(updateVehicleAccident, user));
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
