using IMS.DomainModel.ApplicationClasses.InstituteCountryStateCityManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.InstituteCountryStateCityManagement;
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
    public class InstituteCountryStateCityController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IInstituteCountryStateCityManagementRepository _instituteCountryStateCityManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteCountryStateCityController(IInstituteCountryStateCityManagementRepository instituteCountryStateCityManagementRepository,
            IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _instituteCountryStateCityManagementRepository = instituteCountryStateCityManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        #region Country
        [HttpPost("country")]
        public async Task<IActionResult> AddInstituteCountryAsync([FromBody]AddAdministrationCountryAc country)
        {
            if (string.IsNullOrEmpty(country.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Country name can't be null or empty" });
            else if (string.IsNullOrEmpty(country.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Country code can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _instituteCountryStateCityManagementRepository.AddInstituteCountryAsync(country, loggedInUserInstituteId));
            }
        }

        [HttpGet("country")]
        public async Task<IActionResult> GetAllCountriesAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _instituteCountryStateCityManagementRepository.GetAllCountriesAsync(loggedInUserInstituteId));
        }

        [HttpGet("country/{countryId}")]
        public async Task<IActionResult> GetCountryDetailsAsync(int countryId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var country = await _iMSDbContext.AdministrationCountries.FirstOrDefaultAsync(x => x.Id == countryId && x.InstituteId == loggedInUserInstituteId);
            if (country != null)
                return Ok(country);
            else
                return Ok(new { Message = "Country not found" });
        }

        [HttpPut("country")]
        public async Task<IActionResult> UpdateInstituteCountryAsync([FromBody]UpdateAdministrationCountryAc country)
        {
            if (string.IsNullOrEmpty(country.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Country name can't be null or empty" });
            else if (string.IsNullOrEmpty(country.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Country code can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Id == country.CountryId && x.InstituteId == loggedInUserInstituteId))
                {
                    return Ok(await _instituteCountryStateCityManagementRepository.UpdateInstituteCountryAsync(country, loggedInUserInstituteId));
                }
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Other, Message = "Country not found" });
            }
        }
        #endregion

        #region State
        [HttpPost("state")]
        public async Task<IActionResult> AddInstituteStateAsync([FromBody]AddAdministrationStateAc state)
        {
            if (string.IsNullOrEmpty(state.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "State name can't be null or empty" });
            else if (string.IsNullOrEmpty(state.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "State code can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.Id == state.CountryId && x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _instituteCountryStateCityManagementRepository.AddInstituteStateAsync(state));
                else
                    return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Other, HasError = true, Message = "Invalid country selection" });
            }
        }

        [HttpGet("state")]
        public async Task<IActionResult> GetAllStatesAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _instituteCountryStateCityManagementRepository.GetAllStatesAsync(loggedInUserInstituteId));
        }

        [HttpGet("state/{stateId}")]
        public async Task<IActionResult> GetStateDetailsAsync(int stateId)
        {
            var state = await _iMSDbContext.AdministrationStates.Include(s => s.Country).FirstOrDefaultAsync(x => x.Id == stateId);
            if (state != null)
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.InstituteId == loggedInUserInstituteId && x.Id == state.CountryId))
                {
                    return Ok(state);
                }
                else
                    return Ok(new { Message = "Invalid country selection" });
            }
            else
                return Ok(new { Message = "State not found" });
        }

        [HttpPut("state")]
        public async Task<IActionResult> UpdateInstituteStateAsync([FromBody]UpdateAdministrationStateAc state)
        {
            var stateDetail = await _iMSDbContext.AdministrationStates.FirstOrDefaultAsync(x => x.Id == state.StateId);
            if (stateDetail != null)
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationCountries.AnyAsync(x => x.InstituteId == loggedInUserInstituteId && x.Id == state.CountryId))
                {
                    if (string.IsNullOrEmpty(state.Name.Trim()))
                        return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "State name can't be null or empty" });
                    else if (string.IsNullOrEmpty(state.Code.Trim()))
                        return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "State code can't be null or empty" });
                    else
                        return Ok(await _instituteCountryStateCityManagementRepository.UpdateInstituteStateAsync(state));
                }
                else
                    return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Other, HasError = true, Message = "Invalid country selection" });
            }
            else
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Other, HasError = true, Message = "State not found" });
        }
        #endregion

        #region City
        [HttpPost("city")]
        public async Task<IActionResult> AddInstituteCityAsync([FromBody]AddAdministrationCityAc city)
        {
            if (string.IsNullOrEmpty(city.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "City name can't be null or empty" });
            else if (string.IsNullOrEmpty(city.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "City code can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationStates.AnyAsync(x => x.Id == city.StateId && x.Country.InstituteId == loggedInUserInstituteId))
                    return Ok(await _instituteCountryStateCityManagementRepository.AddInstituteCityAsync(city));
                else
                    return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Other, HasError = true, Message = "Invalid state selection" });
            }
        }

        [HttpGet("city")]
        public async Task<IActionResult> GetAllCitiesAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _instituteCountryStateCityManagementRepository.GetAllCitiesAsync(loggedInUserInstituteId));
        }

        [HttpGet("city/{cityId}")]
        public async Task<IActionResult> GetCityDetailsAsync(int cityId)
        {
            var city = await _iMSDbContext.AdministrationCities.Include(s => s.State).ThenInclude(e => e.Country)
                .FirstOrDefaultAsync(x => x.Id == cityId);
            if (city != null)
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationStates.AnyAsync(x => x.Country.InstituteId == loggedInUserInstituteId && x.Id == city.StateId))
                {
                    return Ok(city);
                }
                else
                    return Ok(new { Message = "Invalid state selection" });
            }
            else
                return Ok(new { Message = "City not found" });
        }

        [HttpPut("city")]
        public async Task<IActionResult> UpdateInstituteCityAsync([FromBody]UpdateAdministrationCityAc city)
        {
            var cityDetail = await _iMSDbContext.AdministrationCities.FirstOrDefaultAsync(x => x.Id == city.CityId);
            if (cityDetail != null)
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationStates.AnyAsync(x => x.Country.InstituteId == loggedInUserInstituteId && x.Id == city.StateId))
                {
                    if (string.IsNullOrEmpty(city.Name.Trim()))
                        return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "City name can't be null or empty" });
                    else if (string.IsNullOrEmpty(city.Code.Trim()))
                        return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "City code can't be null or empty" });
                    else
                        return Ok(await _instituteCountryStateCityManagementRepository.UpdateInstituteCityAsync(city));
                }
                else
                    return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Other, HasError = true, Message = "Invalid state selection" });
            }
            else
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Other, HasError = true, Message = "City not found" });
        }
        #endregion
        #endregion
    }
}
