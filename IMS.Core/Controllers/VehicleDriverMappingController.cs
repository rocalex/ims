using IMS.DomainModel.ApplicationClasses.VehicleDriverMapping;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.VehicleDriverMapping;
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
    public class VehicleDriverMappingController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IVehicleDriverMappingRepository _vehicleDriverMappingRepository;
        private readonly IMSDbContext _imsDbContext;
        #endregion

        #region Constructor
        public VehicleDriverMappingController(UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService
            instituteUserMappingHelperService, IVehicleDriverMappingRepository vehicleDriverMappingRepository, IMSDbContext
            imsDbContext) : base(instituteUserMappingHelperService)
        {
            _userManager = userManager;
            _vehicleDriverMappingRepository = vehicleDriverMappingRepository;
            _imsDbContext = imsDbContext;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddOrUpdateVehicleDriverMappingAsync([FromBody]AddOrUpdateVehicleDriverMappingAc vehicleDriverMapping)
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return Ok(await _vehicleDriverMappingRepository.AddOrUpdateVehicleDriverMappingAsync(vehicleDriverMapping, user));
        }

        [HttpGet("{vehicleId}")]
        public async Task<IActionResult> GetVehicleDriverMappingsAsync(int vehicleId)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await _imsDbContext.VehicleMasters.AnyAsync(x => x.Id == vehicleId && x.InstituteId == instituteId))
                return Ok(await _vehicleDriverMappingRepository.GetVehicleDriverMappingsAsync(vehicleId));
            else
                return Ok(new { Message = "Vehicle not found" });
        }
        #endregion
    }
}
