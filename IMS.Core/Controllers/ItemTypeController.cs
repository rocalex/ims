using IMS.DomainModel.ApplicationClasses.Inventory.Lookup.ItemTypeManagement;
using IMS.DomainModel.ApplicationClasses.LookUpManagement;
using IMS.DomainModel.Data;
using IMS.DomainModel.Models;
using IMS.Repository.Inventory.Lookup.ItemTypeManagement;
using IMS.Utility.InstituteUserMappingHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace IMS.Core.Controllers
{
    [Authorize]
    [Route(BaseUrl)]
    public class ItemTypeController : BaseController
    {
        #region
        private const string BaseUrl = "api/[controller]";
        private readonly IItemTypeManagementRepository itemTypeManagementRepository;
        private readonly IMSDbContext iMSDbContext;
        #endregion

        #region Constructor
        public ItemTypeController(
            IItemTypeManagementRepository _itemTypeManagementRepository,
            IMSDbContext _iMSDbContext,
            IInstituteUserMappingHelperService instituteUserMappingHelperService) : base(instituteUserMappingHelperService)
        {
            itemTypeManagementRepository = _itemTypeManagementRepository;
            iMSDbContext = _iMSDbContext;
        }
        #endregion

        #region Public methods
        [HttpGet("")]
        public async Task<IActionResult> GetAllGroupsAsync()
        {
            var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
            return Ok(await itemTypeManagementRepository.GetComponentsAsync(instituteId));
        }

        [HttpPost("")]
        public async Task<IActionResult> AddGroupAsync([FromBody]AddItemType addGroupAc)
        {
            if (string.IsNullOrEmpty(addGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Item type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(addGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Item type code can't be null or empty"
                });
            else
                return Ok(await itemTypeManagementRepository.AddComponentAsync(addGroupAc, await GetUserCurrentSelectedInstituteIdAsync()));
        }

        [HttpGet("{itemTypeId}")]
        public async Task<IActionResult> GetGroupDetailByIdAsync(int itemTypeId)
        {
            var institudeId = await GetUserCurrentSelectedInstituteIdAsync();
            var gruop = await iMSDbContext.ItemTypes.FirstOrDefaultAsync(x => x.Id == itemTypeId && x.InstituteId == institudeId);
            if (gruop != null)
            {
                return Ok(gruop);
            }
            else
                return Ok(new { Message = "Item type Not found" });
        }

        [HttpPut("")]
        public async Task<IActionResult> UpdateGroupAsync([FromBody]UpdateItemType updateComponentGroupAc)
        {
            if (string.IsNullOrEmpty(updateComponentGroupAc.Name.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Item type name can't be null or empty"
                });
            else if (string.IsNullOrEmpty(updateComponentGroupAc.Code.Trim()))
                return Ok(new SharedLookUpResponse()
                {
                    HasError = true,
                    ErrorType = SharedLookUpResponseType.Name,
                    Message = "Item type code can't be null or empty"
                });
            else
            {
                var instituteId = await GetUserCurrentSelectedInstituteIdAsync();
                if (await iMSDbContext.ItemTypes.AnyAsync(x => x.Id == updateComponentGroupAc.Id && x.InstituteId == instituteId))
                {
                    return Ok(await itemTypeManagementRepository.UpdateComponentAsync(updateComponentGroupAc, instituteId));
                }
                else
                    return Ok(new SharedLookUpResponse() { HasError = true, ErrorType = SharedLookUpResponseType.Code, Message = "Item type not found" });
            }
        }
        #endregion
    }
}
