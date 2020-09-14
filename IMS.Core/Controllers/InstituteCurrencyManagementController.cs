using IMS.DomainModel.ApplicationClasses.AdministrationCurrencyManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.AdministrationCurrencyManagement;
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
    public class InstituteCurrencyManagementController : BaseController
    {
        #region Private Variable(s)
        private const string BaseUrl = "api/[controller]";
        private readonly IAdministrationCurrencyManagementRepository _administrationCurrencyManagementRepository;
        private readonly IMSDbContext _iMSDbContext;
        private readonly UserManager<ApplicationUser> _userManager;
        #endregion

        #region Constructor
        public InstituteCurrencyManagementController(IAdministrationCurrencyManagementRepository administrationCurrencyManagementRepository,
            IMSDbContext iMSDbContext, UserManager<ApplicationUser> userManager, IInstituteUserMappingHelperService instituteUserMappingHelperService)
            : base(instituteUserMappingHelperService)
        {
            _administrationCurrencyManagementRepository = administrationCurrencyManagementRepository;
            _iMSDbContext = iMSDbContext;
            _userManager = userManager;
        }
        #endregion

        #region Public Method(s)
        [HttpPost("")]
        public async Task<IActionResult> AddAdministrationCurrencyAsync([FromBody]AddAdministrationCurrencyAc addAdministrationCurrency)
        {
            if (string.IsNullOrEmpty(addAdministrationCurrency.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Currency name can't be null or empty" });
            else if (string.IsNullOrEmpty(addAdministrationCurrency.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Currency symbol can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                return Ok(await _administrationCurrencyManagementRepository.AddAdministrationCurrencyAsync(addAdministrationCurrency, loggedInUserInstituteId));
            }
        }

        [HttpGet("")]
        public async Task<IActionResult> GetAllCurrenciesAsync()
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await _administrationCurrencyManagementRepository.GetAllCurrenciesAsync(loggedInUserInstituteId));
        }

        [HttpGet("{currencyId}")]
        public async Task<IActionResult> GetCurrencyDetailByIdAsync(int currencyId)
        {
            var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
            var currency = await _iMSDbContext.AdministrationCurrencies.FirstOrDefaultAsync(x => x.Id == currencyId &&
            x.InstituteId == loggedInUserInstituteId);
            if (currency != null)
                return Ok(currency);
            else
                return Ok(new { Message = "Currency not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateAdministrationCurrencyAsync([FromBody]UpdateAdministrationCurrencyAc updateAdministrationCurrency)
        {
            if (string.IsNullOrEmpty(updateAdministrationCurrency.Name.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Name, HasError = true, Message = "Currency name can't be null or empty" });
            else if (string.IsNullOrEmpty(updateAdministrationCurrency.Code.Trim()))
                return Ok(new SharedLookUpResponse { ErrorType = SharedLookUpResponseType.Code, HasError = true, Message = "Currency symbol can't be null or empty" });
            else
            {
                var loggedInUserInstituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await _iMSDbContext.AdministrationCurrencies.AnyAsync(x => x.Id == updateAdministrationCurrency.CurrencyId && x.InstituteId == loggedInUserInstituteId))
                    return Ok(await _administrationCurrencyManagementRepository.UpdateAdministrationCurrencyAsync(updateAdministrationCurrency, loggedInUserInstituteId));
                else
                    return Ok(new SharedLookUpResponse { HasError = true, ErrorType = SharedLookUpResponseType.Other, Message = "Currency not found" });
            }
        }
        #endregion
    }
}
