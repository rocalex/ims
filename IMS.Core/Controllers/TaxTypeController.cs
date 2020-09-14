using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.TaxTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Inventory.Lookup.TaxTypeManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class TaxTypeController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly ITaxTypeManagementRepository taxTypeManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public TaxTypeController(
            ITaxTypeManagementRepository _taxTypeManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            taxTypeManagementRepository = _taxTypeManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await taxTypeManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddTaxType addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Tax Type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Tax Type code can't be null or empty"
                });
            else
                return Ok(await taxTypeManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{itemTypeId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int itemTypeId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.TaxTypes.FirstOrDefaultAsync(x => x.Id == itemTypeId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Tax Type Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateTaxType updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Tax Type name can't be null or empty"
                });
        else if (string.IsNullOrEmpty(updateComponentGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Tax Type code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.TaxTypes.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await taxTypeManagementRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Tax Type not found" });
            }
        }
        #endregion
    }
}
