using IMS.DomainModel.ApplicationClasses.Inventory.Location;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Inventory.Inventory;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class LocationController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IAddressManagementRepository addressManagementRepository;
        private readonly ILocationManagementRepository locationManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public LocationController(
            IAddressManagementRepository _addressManagementRepository,
            ILocationManagementRepository _locationManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            addressManagementRepository = _addressManagementRepository;
            locationManagementRepository = _locationManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await locationManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpGet("countrylist")]
        public async Task<IActionResult> GetCountryListAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await iMSDbContext.AdministrationCountries.Where(x => x.InstituteId == instituteId).ToListAsync());
        }

        [HttpGet("statelist/{countryId}")]
        public async Task<IActionResult> GetStateListAsync(int countryId)
        {
            return Ok(await iMSDbContext.AdministrationStates.Where(x => x.CountryId == countryId).ToListAsync());
        }

        [HttpGet("citylist/{stateId}")]
        public async Task<IActionResult> GetCityListAsync(int stateId)
        {
            return Ok(await iMSDbContext.AdministrationCities.Where(x => x.StateId == stateId).ToListAsync());
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddLocation addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Location name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Location code can't be null or empty"
                });
            else
                return Ok(await locationManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpPost("address")]
        public async Task<IActionResult> AddAddressAsync([FromBody]AddAddress addAddress)
        {
             return Ok(await addressManagementRepository.AddComponentAsync(addAddress, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{componentGroupId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int componentGroupId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.Locations.Include(s => s.BillingAddress).Include(s => s.ShippingAddress).FirstOrDefaultAsync(x => x.Id == componentGroupId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Location Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateLocation updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Location name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateComponentGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Location code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.Locations.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await locationManagementRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Location not found" });
            }
        }

        [HttpPut("address")]
        public async Task<IActionResult> UpdateAddressAsync([FromBody]UpdateAddress updateAddress)
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            if (await iMSDbContext.LocationAddressModels.AnyAsync(x => x.Id == updateAddress.Id && x.InstituteId == instituteId))
            {
                return Ok(await addressManagementRepository.UpdateComponentAsync(updateAddress, instituteId));
            }
            else
                return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Location not found" });
        }
        #endregion
    }
}
